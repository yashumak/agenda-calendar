import React from 'react';
import { Event } from '../types/event';
import { formatEventTime, parseDate } from '../utils/dateUtils';
import { Calendar, Clock } from 'lucide-react';

interface CalendarListProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

const CalendarList: React.FC<CalendarListProps> = ({ currentDate, events, onEventClick }) => {
  // Get events for the current month and sort by date/time
  const monthEvents = events
    .filter(event => {
      const eventDate = parseDate(event.date);
      return eventDate.getMonth() === currentDate.getMonth() && 
             eventDate.getFullYear() === currentDate.getFullYear();
    })
    .sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;
      return a.startTime.localeCompare(b.startTime);
    });

  // Group events by date
  const eventsByDate = monthEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, Event[]>);

  const formatDateHeader = (dateString: string): string => {
    const date = parseDate(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {Object.keys(eventsByDate).length === 0 ? (
        <div className="p-8 text-center">
          <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No events this month
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Click on any date in the calendar to add your first event.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {Object.entries(eventsByDate).map(([date, dayEvents]) => (
            <div key={date} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {formatDateHeader(date)}
              </h3>
              
              <div className="space-y-3">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
                  >
                    <div
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: event.color }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{formatEventTime(event.startTime, event.endTime)}</span>
                      </div>
                      
                      {event.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarList;