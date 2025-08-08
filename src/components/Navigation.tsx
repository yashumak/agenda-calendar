import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthName, getYear, addMonths } from '../utils/dateUtils';

interface NavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentDate, onDateChange }) => {
  const handlePrevMonth = () => {
    onDateChange(addMonths(currentDate, -1));
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getMonthName(currentDate)} {getYear(currentDate)}
        </h1>
        <button
          onClick={handleToday}
          className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
        >
          Today
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;