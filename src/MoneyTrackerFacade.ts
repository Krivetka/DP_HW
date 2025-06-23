import { Store } from './model';
import { Command, AddTransactionCommand } from './command';

export class MoneyTrackerFacade {
    private store = Store.getInstance();
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];

    addTransaction(desc: string, amount: number) {
        const cmd = new AddTransactionCommand(desc, amount);
        cmd.execute();
        this.undoStack.push(cmd);
        this.redoStack = [];
    }

    undo() {
        const cmd = this.undoStack.pop();
        if (cmd) {
            cmd.undo();
            this.redoStack.push(cmd);
        }
    }

    redo() {
        const cmd = this.redoStack.pop();
        if (cmd) {
            cmd.execute();
            this.undoStack.push(cmd);
        }
    }

    getTransactions() {
        return this.store.getTransactions();
    }

    getBalance() {
        return this.store.getBalance();
    }

    subscribe(listener: () => void) {
        this.store.subscribe(listener);
    }
}
