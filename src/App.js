import React from 'react';
import CountdownTimer from './CountdownTimer';

export default function App() {
  // Edit the target date to your move-in date or event
  const target = new Date('2026-12-01T12:00:00');

  return (
    <div className="app">
      <div className="card">
        <CountdownTimer targetDate={target} />
      </div>
    </div>
  );
}
