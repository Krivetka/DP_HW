import { Transaction } from './model';

export class View {
    private form: HTMLFormElement;
    private descInput: HTMLInputElement;
    private amountInput: HTMLInputElement;
    private transactionList: HTMLUListElement;
    private balanceEl: HTMLElement;
    private undoBtn: HTMLButtonElement;
    private redoBtn: HTMLButtonElement;

    constructor() {
        this.form = document.getElementById('transaction-form') as HTMLFormElement;
        this.descInput = document.getElementById('desc') as HTMLInputElement;
        this.amountInput = document.getElementById('amount') as HTMLInputElement;
        this.transactionList = document.getElementById('transaction-list') as HTMLUListElement;
        this.balanceEl = document.getElementById('balance') as HTMLElement;
        this.undoBtn = document.getElementById('undo') as HTMLButtonElement;
        this.redoBtn = document.getElementById('redo') as HTMLButtonElement;
    }

    bindAddTransaction(handler: (desc: string, amount: number) => void) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            const desc = this.descInput.value.trim();
            const amount = Number(this.amountInput.value);
            if (desc && !isNaN(amount) && amount !== 0) {
                handler(desc, amount);
                this.form.reset();
            }
        });
    }

    bindUndo(handler: () => void) {
        this.undoBtn.addEventListener('click', () => handler());
    }

    bindRedo(handler: () => void) {
        this.redoBtn.addEventListener('click', () => handler());
    }

    renderTransactions(transactions: Transaction[]) {
        this.transactionList.innerHTML = '';
        transactions.forEach(t => {
            const li = document.createElement('li');
            li.textContent = `${t.description}: ${t.amount > 0 ? '+' : ''}${t.amount} PLN`;
            li.style.color = t.amount >= 0 ? '#16a34a' : '#dc2626';
            this.transactionList.appendChild(li);
        });
    }

    renderBalance(balance: number) {
        this.balanceEl.textContent = balance.toFixed(2);
        this.balanceEl.style.color = balance >= 0 ? '#15803d' : '#b91c1c';
    }
}
