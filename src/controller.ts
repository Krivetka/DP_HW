import { MoneyTrackerFacade } from './MoneyTrackerFacade';
import {View} from "./view";

export class Controller {
    private facade = new MoneyTrackerFacade();
    private view: View;

    constructor(view: View) {
        this.view = view;
        this.facade.subscribe(() => this.updateView());

        this.view.bindAddTransaction(this.handleAddTransaction.bind(this));
        this.view.bindUndo(this.handleUndo.bind(this));
        this.view.bindRedo(this.handleRedo.bind(this));

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
        this.view.renderTransactions(this.facade.getTransactions());
        this.view.renderBalance(this.facade.getBalance());
    }
}
