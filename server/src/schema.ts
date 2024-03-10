export interface Todo {
  id: string;
  title: string;
  description: string | null;
  assignee: string | null;
  location: string | null;
  cost: number | null;
  creator: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  transactionId: string | null;
}
