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
  totalHours: 16,
  unitSize: 10,
  tasks: DEFAULT_TASKS,
  activeTaskId: DEFAULT_TASKS[0].id,
  gridState: {},
};

function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.error('Failed to load grid state from localStorage:', err);
  }
  return DEFAULT_STATE;
}

export default function App() {
  const [tracker, setTracker] = useState(loadSavedState);
  const [modalMode, setModalMode] = useState(null); // null | 'new' | 'adjust'

  // AUTO-SAVE: any time tracker changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
    } catch (err) {
      console.error('Failed to save grid state:', err);
    }
  }, [tracker]);

  // Derived values - gridUtils.js & Rectangular Grid calculations
  const totalSquares = calculateTotalSquares(tracker.totalHours, tracker.unitSize);
  const { cols, rows } = calculateGridDimensions(totalSquares);
  const rectangularTotalSquares = cols * rows;

  const filledSquaresCount = Object.keys(tracker.gridState).length;
  const formattedTotalTime = calculateSquaresToEstimate(rectangularTotalSquares, tracker.unitSize);
  const formattedLoggedTime = calculateSquaresToEstimate(filledSquaresCount, tracker.unitSize);

  const updateTracker = (updates) => {
    setTracker((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="app-container" style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0' }}>{tracker.title}</h1>
          <p style={{ margin: 0, color: '#cbd5e1' }}>
            Logged: <strong>{formattedLoggedTime}</strong> / {formattedTotalTime} ({cols}x{rows} grid)
          </p>
        </div>

        {/* Pop-up Trigger Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setModalMode('adjust')}
            style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #475569', background: '#1e293b', color: '#fff', cursor: 'pointer' }}
          >
            Adjust
          </button>
          <button
            onClick={() => setModalMode('new')}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#11bd84', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            + New
          </button>
        </div>
      </div>

      {/* Pop-up Calculator Modal */}
      {modalMode && (
        <GridCalculator
          mode={modalMode}
          currentTitle={tracker.title}
          currentHours={tracker.totalHours}
          currentUnitSize={tracker.unitSize}
          onClose={() => setModalMode(null)}
          onSave={({ title, totalHours, unitSize, resetGrid }) => {
            updateTracker({
              title,
              totalHours,
              unitSize,
              ...(resetGrid ? { gridState: {} } : {}),
            });
            setModalMode(null);
          }}
        />
      )}

      {/* Color Legend with Double-Click Color Picker & (+) Add Task */}
      <ColorLegend
        tasks={tracker.tasks}
        activeTaskId={tracker.activeTaskId}
        onSelectTask={(id) => updateTracker({ activeTaskId: id })}
        onUpdateTask={(taskId, updatedFields) => {
          const updatedTasks = tracker.tasks.map((t) =>
            t.id === taskId ? { ...t, ...updatedFields } : t
          );
          updateTracker({ tasks: updatedTasks });
        }}
        onDeleteTask={(taskId) => {
          // Prevent deleting if it's the last task
          if (tracker.tasks.length <= 1) return;

          const updatedTasks = tracker.tasks.filter((t) => t.id !== taskId);
          // Clean up gridState items that used the deleted task
          const newGridState = { ...tracker.gridState };
          Object.keys(newGridState).forEach((key) => {
            if (newGridState[key] === taskId) delete newGridState[key];
          });

          // If active task was deleted, fallback to first available task
          const newActiveId = tracker.activeTaskId === taskId ? updatedTasks[0].id : tracker.activeTaskId;

          updateTracker({
            tasks: updatedTasks,
            activeTaskId: newActiveId,
            gridState: newGridState,
          });
        }}
        onAddTask={(newTask) => {
          updateTracker({
            tasks: [...tracker.tasks, newTask],
            activeTaskId: newTask.id,
          });
        }}
      />

      {/* Strictly Rectangular Working Grid */}
      <WorkingGrid
        cols={cols}
        rows={rows}
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