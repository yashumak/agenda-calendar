# Calendar Application

A comprehensive calendar application built with React and TypeScript, featuring full event management capabilities, multiple view modes, and a beautiful responsive design.

## Features

### Core Functionality
- **Monthly Calendar Grid**: Traditional calendar layout with date navigation
- **Event Management**: Create, edit, and delete events with full form validation
- **Dual View Modes**: Switch between grid and list views
- **Smart Navigation**: Previous/next month navigation with "Today" button
- **Event Categories**: Color-coded event categories (Work, Personal, Meeting, Other)

### User Experience
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Interactive UI**: Hover states, smooth transitions, and micro-interactions
- **Today Highlighting**: Current date is prominently highlighted
- **Event Previews**: See event details without opening full modals

### Data Management
- **LocalStorage Persistence**: All events are saved locally
- **Data Validation**: Form validation with error handling
- **Unique Event IDs**: Proper event identification and management
- **Storage Error Handling**: Graceful handling of storage limitations

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yashumak/agenda-calendar.git
cd calendar-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding Events
1. Click the "Add Event" button or click on any date in the calendar
2. Fill in the event details:
   - **Title** (required): Name of your event
   - **Description** (optional): Additional details
   - **Date** (required): Event date
   - **Start/End Time**: Event duration
   - **Category**: Choose from Work, Personal, Meeting, or Other
3. Click "Create Event" to save

### Managing Events
- **View Event Details**: Click on any event in grid or list view
- **Edit Events**: Click "Edit" in the event detail modal
- **Delete Events**: Click "Delete" in the event detail modal (with confirmation)

### View Modes
- **Grid View**: Traditional monthly calendar with events displayed as colored blocks
- **List View**: Chronological list showing all events with full details

### Navigation
- Use the left/right arrows to navigate between months
- Click "Today" to quickly return to the current date
- The current month and year are always displayed prominently

### Theme Toggle
- Click the sun/moon icon to switch between light and dark themes
- Your theme preference is automatically saved and restored

## Technical Details

### Architecture
- **React Functional Components**: Using modern React patterns with hooks
- **TypeScript**: Full type safety throughout the application
- **Context API**: Theme management with React Context
- **Custom Hooks**: Reusable logic for theme and localStorage
- **Modular Structure**: Clean separation of concerns

### Key Components
- `Calendar`: Main component orchestrating the entire application
- `CalendarGrid`: Monthly grid view with event display
- `CalendarList`: Chronological list view for events
- `EventModal`: Modal for creating and editing events
- `EventForm`: Reusable form component with validation
- `Navigation`: Month navigation controls
- `ThemeToggle`: Dark/light mode switcher

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Full dark theme support with class-based toggling
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Transitions and hover effects for better UX

### Data Structure
```typescript
interface Event {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  category: 'work' | 'personal' | 'meeting' | 'other';
  color: string;
}
```

## Browser Compatibility

This application works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- localStorage API
- Modern React features

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Google Calendar's clean interface
- Icons provided by Lucide React
- Built with React, TypeScript, and Tailwind CSS
