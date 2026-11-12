import { useState, useEffect } from 'react';
import {
  calculateTotalSquares,
  calculateGridDimensions,
  calculateSquaresToEstimate,
} from './utils/gridUtils';
import GridCalculator from './components/GridCalculator';
import ColorLegend from './components/ColorLegend';
import WorkingGrid from './components/WorkingGrid';


const STORAGE_KEY = 'grid_tracker_data_v1';

function getCurrentWeekNumber() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDays = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
}

const DEFAULT_TASKS = [
  { id: 't1', name: 'WorkOut', color: '#ae3bf6' },
  { id: 't2', name: 'Self projects', color: '#11bd84' },
  { id: 't3', name: 'Study/reading', color: '#f59e0b' },
];

const DEFAULT_STATE = {
  title: `Week #${getCurrentWeekNumber()}`,
  totalHours: 16, // Number: used to calculate total grid squares
  unitSize: 10,   // Number: 10 mins per square
  tasks: DEFAULT_TASKS,
  activeTaskId: DEFAULT_TASKS[0].id, // Defaults to 't1'
  gridState: {},  // Map of { squareIndex: taskId }, e.g., { 0: 't1', 5: 't2' }
};

// lazy load : loads once, saves that and only adjusts that with merging 
function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { // merge with DEFAULT_STATE so new properties never break old saves
      return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.error('Failed to load grid state from localStorage:', err);
  }
  return DEFAULT_STATE;
}

export default function App() {
  // Pass the function reference to useState for lazy loading
  const [tracker, setTracker] = useState(loadSavedState);

  // AUTO-SAVE: any time tracker changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
    } catch (err) {
      console.error('Failed to save grid state:', err);
    }
  }, [tracker]);

  // derived values - gridUtils.js
  const totalSquares = calculateTotalSquares(tracker.totalHours, tracker.unitSize);
  const { cols, rows } = calculateGridDimensions(totalSquares);
  
  const filledSquaresCount = Object.keys(tracker.gridState).length;
  const formattedTotalTime = calculateSquaresToEstimate(totalSquares, tracker.unitSize);
  const formattedLoggedTime = calculateSquaresToEstimate(filledSquaresCount, tracker.unitSize);

  const updateTracker = (updates) => {
    setTracker((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="app-container" style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
    <h1>{tracker.title}</h1>
    <p>
      Logged: <strong>{formattedLoggedTime}</strong> / {formattedTotalTime} ({cols}x{rows} grid)
    </p>

    {/* Calculator Input Component */}
    <GridCalculator 
      totalHours={tracker.totalHours} 
      unitSize={tracker.unitSize} 
      onUpdate={updateTracker} 
    />

    {/* Task Color Legend Component */}
    <ColorLegend 
      tasks={tracker.tasks} 
      activeTaskId={tracker.activeTaskId} 
      onSelectTask={(id) => updateTracker({ activeTaskId: id })} 
    />

    {/* Main Working Grid Component */}
    <WorkingGrid 
      totalSquares={totalSquares}
      cols={cols}
      gridState={tracker.gridState}
      tasks={tracker.tasks}
      activeTaskId={tracker.activeTaskId}
      onSquareClick={(index) => {
        const newGridState = { ...tracker.gridState };
        if (newGridState[index] === tracker.activeTaskId) {
          delete newGridState[index];
        } else {
          newGridState[index] = tracker.activeTaskId;
        }
        updateTracker({ gridState: newGridState });
      }}
    />
  </div>
  );
}