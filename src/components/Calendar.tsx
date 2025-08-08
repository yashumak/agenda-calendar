import React, { useState, useEffect } from 'react';
import { Plus, Grid, List } from 'lucide-react';
import { Event } from '../types/event';
import { saveEvents, loadEvents, generateEventId } from '../utils/localStorage';
import Navigation from './Navigation';
import CalendarGrid from './CalendarGrid';
import CalendarList from './CalendarList';
import EventModal from './EventModal';
import EventDetailModal from './EventDetailModal';
import ThemeToggle from './ThemeToggle';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    try {
      const loadedEvents = loadEvents();
      setEvents(loadedEvents);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (events.length > 0 || events.length === 0) {
      try {
        saveEvents(events);
      } catch (error) {
        console.error('Failed to save events:', error);
        alert('Failed to save events. Storage may be full.');
      }
    }
  }, [events]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(undefined);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedDate(new Date());
    setEditingEvent(undefined);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...eventData, id: editingEvent.id }
          : event
      ));
    } else {
      // Create new event
      const newEvent: Event = {
        ...eventData,
        id: generateEventId()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    
    setIsEventModalOpen(false);
    setEditingEvent(undefined);
    setSelectedDate(undefined);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(undefined);
    setIsEventModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setEditingEvent(undefined);
    setSelectedDate(undefined);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleAddEvent}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Event
            </button>

            <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
          </div>

          <ThemeToggle />
        </div>

        {/* Navigation */}
        <Navigation
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />

        {/* Calendar Content */}
        <div className="mb-6">
          {viewMode === 'grid' ? (
            <CalendarGrid
              currentDate={currentDate}
              events={events}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
            />
          ) : (
            <CalendarList
              currentDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
            />
          )}
        </div>

        {/* Modals */}
        <EventModal
          isOpen={isEventModalOpen}
          onClose={handleCloseEventModal}
          event={editingEvent}
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
        />

        <EventDetailModal
          event={selectedEvent}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default Calendar;