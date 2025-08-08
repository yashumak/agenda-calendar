import React from 'react';
import { Event } from '../types/event';
import { getCalendarDays, formatDate, isToday, isSameDay } from '../utils/dateUtils';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick 
}) => {
  const calendarDays = getCalendarDays(currentDate);
  
  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => event.date === formatDate(date));
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {weekDays.map(day => (
          <div key={day} className="p-4 text-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);
          
          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                !isCurrentMonthDay ? 'bg-gray-50 dark:bg-gray-800/50' : ''
              }`}
              onClick={() => onDateClick(date)}
            >
              <div className="flex flex-col h-full">
                <div className={`text-sm font-medium mb-1 ${
                  isTodayDate 
                    ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' 
                    : isCurrentMonthDay 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {date.getDate()}
                </div>
                
                <div className="flex-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className="px-2 py-1 rounded text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity duration-200 truncate"
                      style={{ backgroundColor: event.color }}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;