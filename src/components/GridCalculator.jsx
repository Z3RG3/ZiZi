export default function GridCalculator({ totalHours, unitSize, onUpdate }) {
  return (
    <div style={{ display: 'flex', gap: '15px', margin: '15px 0', alignItems: 'center' }}>
      <label>
        Total Hours:
        <input
          type="number"
          value={totalHours}
          onChange={(e) => onUpdate({ totalHours: Number(e.target.value) })}
          style={{ marginLeft: '8px', width: '60px', padding: '4px' }}
        />
      </label>
      <label>
        Mins / Square:
        <select
          value={unitSize}
          onChange={(e) => onUpdate({ unitSize: Number(e.target.value) })}
          style={{ marginLeft: '8px', padding: '4px' }}
        >
          <option value={5}>5 mins</option>
          <option value={10}>10 mins</option>
          <option value={15}>15 mins</option>
          <option value={30}>30 mins</option>
        </select>
      </label>
    </div>
  );
}