import { TransactionType } from './transactionType.enum';

export interface Transaction {
  id: number;
  description: string;
  recurrent: boolean;
  transactionValue: number;
  createdAt: Date;
  transactionDueDate: Date;
  transactionType: TransactionType;
  accountId: number;
  categoryId: number;
}
