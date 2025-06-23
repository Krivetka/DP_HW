import { Store, Transaction } from './model';

export interface Command {
    execute(): void;
    undo(): void;
}

export class AddTransactionCommand implements Command {
    private store = Store.getInstance();
    private transaction?: Transaction;

    constructor(private description: string, private amount: number) {}

    execute() {
        this.transaction = this.store.addTransaction(this.description, this.amount);
    }

    undo() {
        if (this.transaction) {
            this.store.removeTransaction(this.transaction.id);
        }
    }
}
