import { SpendingGoal } from './spending-goal.model';

export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
  spendingGoals?: SpendingGoal[];
}
