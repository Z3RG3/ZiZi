import { useState } from 'react';

export default function GridCalculator({ mode, currentTitle, currentHours, currentUnitSize, onSave, onClose }) {
  // If mode === 'new', start fresh; if 'adjust', prefill with current values
  const [title, setTitle] = useState(mode === 'new' ? '' : currentTitle);
  const [totalHours, setTotalHours] = useState(mode === 'new' ? 40 : currentHours);
  const [unitSize, setUnitSize] = useState(mode === 'new' ? 10 : currentUnitSize);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title: title.trim() || 'Untitled Tracker',
      totalHours: Math.max(1, Number(totalHours)),
      unitSize: Number(unitSize),
      resetGrid: mode === 'new', // Tells App.jsx to wipe gridState if it's a new tracker
    });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1e293b', color: '#f8fafc', padding: '24px', borderRadius: '14px',
        width: '320px', display: 'flex', flexDirection: 'column', gap: '16px',
        border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <h3 style={{ margin: 0 }}>{mode === 'new' ? 'New Grid Tracker' : 'Adjust Tracker'}</h3>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
          Tracker Title
          <input
            type="text"
            placeholder="e.g., Week #47"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
          Goal Hours
          <input
            type="number"
            min="1"
            max="500"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
          Minutes per Square
          <select
            value={unitSize}
            onChange={(e) => setUnitSize(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
          >
            <option value={5}>5 mins</option>
            <option value={10}>10 mins</option>
            <option value={15}>15 mins</option>
            <option value={30}>30 mins</option>
            <option value={60}>60 mins</option>
          </select>
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', background: '#334155', color: '#fff', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', background: '#11bd84', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            {mode === 'new' ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}