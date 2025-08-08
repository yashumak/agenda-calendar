import { Event } from '../types/event';

const STORAGE_KEY = 'calendar-events';

export const saveEvents = (events: Event[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events to localStorage:', error);
    throw new Error('Unable to save events. Storage may be full.');
  }
};

export const loadEvents = (): Event[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load events from localStorage:', error);
    return [];
  }
};

export const clearEvents = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear events from localStorage:', error);
  }
};

export const generateEventId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};