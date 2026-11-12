export default function ColorLegend({ tasks, activeTaskId, onSelectTask }) {
  return (
    <div style={{ display: 'flex', gap: '12px', margin: '20px 0', flexWrap: 'wrap' }}>
      {tasks.map((task) => {
        const isActive = task.id === activeTaskId;
        return (
          <button
            key={task.id}
            onClick={() => onSelectTask(task.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isActive ? '#fff' : '#f1f5f9',
              border: `2px solid ${isActive ? task.color : '#cbd5e1'}`,
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: isActive ? `0 0 8px ${task.color}50` : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: task.color,
                display: 'inline-block',
              }}
            />
            <span style={{ fontWeight: isActive ? '600' : '400', color: '#1e293b' }}>
              {task.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}