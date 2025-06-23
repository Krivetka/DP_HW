export interface Transaction {
    id: number;
    description: string;
    amount: number;
}

type Listener = () => void;

export class Store {
    private static instance: Store;
    private transactions: Transaction[] = [];
    private listeners: Listener[] = [];
    private nextId = 1;

    private constructor() {}

    static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    addTransaction(description: string, amount: number) {
        const transaction: Transaction = {
            id: this.nextId++,
            description,
            amount,
        };
        this.transactions.push(transaction);
        this.notify();
        return transaction;
    }

    removeTransaction(id: number) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.notify();
    }

    getTransactions() {
        return [...this.transactions];
    }

    getBalance() {
        return this.transactions.reduce((acc, t) => acc + t.amount, 0);
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
    }

    unsubscribe(listener: Listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    private notify() {
        this.listeners.forEach(l => l());
    }
}
