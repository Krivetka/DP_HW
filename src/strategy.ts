import { Transaction } from './model';

export interface FilterStrategy {
    filter(transactions: Transaction[]): Transaction[];
}

export class AllStrategy implements FilterStrategy {
    filter(transactions: Transaction[]) {
        return transactions;
    }
}

export class IncomeOnlyStrategy implements FilterStrategy {
    filter(transactions: Transaction[]) {
        return transactions.filter(t => t.amount > 0);
    }
}

export class ExpenseOnlyStrategy implements FilterStrategy {
    filter(transactions: Transaction[]) {
        return transactions.filter(t => t.amount < 0);
    }
}
