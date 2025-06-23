import { MoneyTrackerFacade } from './MoneyTrackerFacade';
import {View} from "./view";
import {AllStrategy, ExpenseOnlyStrategy, FilterStrategy, IncomeOnlyStrategy} from "./strategy";

export class Controller {
    private facade = new MoneyTrackerFacade();
    private currentStrategy: FilterStrategy = new AllStrategy();
    private view: View;

    constructor(view: View) {
        this.view = view;
        this.facade.subscribe(() => this.updateView());

        this.view.bindAddTransaction(this.handleAddTransaction.bind(this));
        this.view.bindUndo(this.handleUndo.bind(this));
        this.view.bindRedo(this.handleRedo.bind(this));

        window.addEventListener('strategyChange', (e: any) => {
            const type = e.detail;
            switch (type) {
                case 'income': this.setStrategy(new IncomeOnlyStrategy()); break;
                case 'expense': this.setStrategy(new ExpenseOnlyStrategy()); break;
                default: this.setStrategy(new AllStrategy()); break;
            }
        });


        this.updateView();
    }

    setStrategy(strategy: FilterStrategy) {
        this.currentStrategy = strategy;
        this.updateView();
    }


    private handleAddTransaction(desc: string, amount: number) {
        this.facade.addTransaction(desc, amount);
    }

    private handleUndo() {
        this.facade.undo();
    }

    private handleRedo() {
        this.facade.redo();
    }

    private updateView() {
        const transactions = this.facade.getTransactions();
        const filtered = this.currentStrategy.filter(transactions);
        const balance = this.facade.getBalance();
        this.view.renderTransactions(filtered);
        this.view.renderBalance(balance);
    }
}
