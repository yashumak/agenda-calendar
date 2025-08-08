export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  category: 'work' | 'personal' | 'meeting' | 'other';
  color: string;
}

export interface CalendarView {
  type: 'grid' | 'list';
  currentDate: Date;
}