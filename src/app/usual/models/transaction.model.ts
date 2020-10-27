export interface Transaction {
    id: number;
    description: string,
    recurrent: boolean,
    transactionValue: number,
    transactionDate: Date,
    transactionDueDate: Date,
  }