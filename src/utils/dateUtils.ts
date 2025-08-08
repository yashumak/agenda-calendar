export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatTime = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return formatDate(date1) === formatDate(date2);
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const getMonthName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export const getYear = (date: Date): number => {
  return date.getFullYear();
};

export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export const getCalendarDays = (date: Date): Date[] => {
  const firstDay = getFirstDayOfMonth(date);
  const daysInMonth = getDaysInMonth(date);
  const days: Date[] = [];

  // Add previous month's days
  const prevMonth = addMonths(date, -1);
  const daysInPrevMonth = getDaysInMonth(prevMonth);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i));
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), day));
  }

  // Add next month's days to complete the grid
  const nextMonth = addMonths(date, 1);
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    days.push(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day));
  }

  return days;
};

export const formatEventTime = (startTime: string, endTime: string): string => {
  const formatTime12 = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  return `${formatTime12(startTime)} - ${formatTime12(endTime)}`;
};