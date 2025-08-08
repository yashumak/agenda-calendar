import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Calendar from './components/Calendar';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Calendar />
      </div>
    </ThemeProvider>
  );
}

export default App;