import React from 'react';
import { X, Calendar, Clock, Tag, Edit, Trash2 } from 'lucide-react';
import { Event } from '../types/event';
import { formatEventTime, parseDate } from '../utils/dateUtils';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!isOpen || !event) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDateDisplay = (dateString: string): string => {
    const date = parseDate(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
      onClose();
    }
  };

  const handleEdit = () => {
    onEdit(event);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: event.color }}
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Event Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {event.title}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Calendar className="w-5 h-5" />
              <span>{formatDateDisplay(event.date)}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5" />
              <span>{formatEventTime(event.startTime, event.endTime)}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Tag className="w-5 h-5" />
              <span className="capitalize">{event.category}</span>
            </div>
          </div>

          {event.description && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Description
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;