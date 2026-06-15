export type Habit = {
  id: string;

  // habit name
  title: string;

  // target value
  target: number;

  // pages, minutes, glasses, etc.
  unit: string;

  // today's progress
  progress: number;

  // streak count
  streak: number;

  completedToday: boolean;

  lastCompletedDate: string | null;
};