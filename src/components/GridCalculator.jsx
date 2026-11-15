import { useState } from 'react';

function getCurrentWeekNumber() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDays = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
}

export default function GridCalculator({ mode, currentTitle, currentHours, currentUnitSize, onSave, onClose }) {
  const defaultWeekTitle = `Week #${getCurrentWeekNumber()}`;

  const [title, setTitle] = useState(mode === 'new' ? '' : currentTitle);
  const [totalHours, setTotalHours] = useState(mode === 'new' ? 40 : currentHours);
  const [unitSize, setUnitSize] = useState(mode === 'new' ? 10 : currentUnitSize);

  const handleDecrease = () => setUnitSize((prev) => Math.max(5, prev - 5));
  const handleIncrease = () => setUnitSize((prev) => prev + 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTitle = title.trim() === '' ? defaultWeekTitle : title.trim();
    onSave({
      title: finalTitle,
      totalHours: Math.max(1, Number(totalHours)),
      unitSize: Number(unitSize),
      resetGrid: mode === 'new',
    });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1e293b', color: '#f8fafc', padding: '24px', borderRadius: '14px',
        width: '340px', display: 'flex', flexDirection: 'column', gap: '18px',
        border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <h3 style={{ margin: 0 }}>{mode === 'new' ? 'New Grid Tracker' : 'Adjust Tracker'}</h3>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
          Tracker Title
          <input
            type="text"
            placeholder={defaultWeekTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', outline: 'none' }}
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
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', outline: 'none' }}
          />
        </label>

        {/* Minutes per Square Stepper Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
          Minutes per Square
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', padding: '4px 8px'
          }}>
            <button
              type="button"
              onClick={handleDecrease}
              style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              -
            </button>
            <span style={{ fontWeight: '600', fontSize: '15px' }}>{unitSize} mins</span>
            <button
              type="button"
              onClick={handleIncrease}
              style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              +
            </button>
          </div>
        </div>

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