export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: string;
  dueDate: string | null; // ISO Date string
  createdAt: number;
}

export type Filter = 'all' | 'active' | 'completed';
export type Sort = 'date' | 'priority' | 'alphabetical';
