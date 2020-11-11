import { BankAccount } from './bank-account.model';
import { Category } from './category.model';
import { Transaction } from './transaction.model';
export interface Activities {
    id: number;
    table: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    transaction?: Transaction;
    category?: Category;
    bankAccount?: BankAccount;
  }