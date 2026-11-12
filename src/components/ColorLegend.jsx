import { useState } from 'react';

export default function ColorLegend({ tasks, activeTaskId, onSelectTask, onUpdateTaskColor, onAddTask }) {
  const [editingColorId, setEditingColorId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskName.trim()) {
      setIsAdding(false);
      return;
    }
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    onAddTask({
      id: `t_${Date.now()}`,
      name: newTaskName.trim(),
      color: randomColor,
    });
    setNewTaskName('');
    setIsAdding(false);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', margin: '20px 0', flexWrap: 'wrap', alignItems: 'center' }}>
      {tasks.map((task) => {
        const isActive = task.id === activeTaskId;
        const isPickingColor = editingColorId === task.id;

        return (
          <div key={task.id} style={{ position: 'relative' }}>
            {/* Floating color picker above the pill on double-click */}
            {isPickingColor && (
              <div style={{
                position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)',
                background: '#1e293b', padding: '6px', borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)', display: 'flex', gap: '6px', alignItems: 'center', zIndex: 10
              }}>
                <input
                  type="color"
                  value={task.color}
                  onChange={(e) => onUpdateTaskColor(task.id, e.target.value)}
                  style={{ width: '32px', height: '28px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <button
                  onClick={() => setEditingColorId(null)}
                  style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            )}

            <button
              onClick={() => onSelectTask(task.id)}
              onDoubleClick={() => setEditingColorId(isPickingColor ? null : task.id)}
              title="Click to select, double-click to change color"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: isActive ? '#fff' : '#f1f5f9',
                border: `2px solid ${isActive ? task.color : '#cbd5e1'}`,
                padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
                boxShadow: isActive ? `0 0 12px ${task.color}80` : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: task.color }} />
              <span style={{ fontWeight: isActive ? '600' : '400', color: '#1e293b' }}>
                {task.name}
              </span>
            </button>
          </div>
        );
      })}

      {/* (+) Add Task Button / Inline Input */}
      {isAdding ? (
        <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '6px' }}>
          <input
            autoFocus
            type="text"
            placeholder="Task name..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onBlur={handleCreateTask}
            style={{
              padding: '6px 12px', borderRadius: '20px', border: '2px solid #11bd84',
              outline: 'none', fontSize: '14px', width: '130px'
            }}
          />
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          title="Add new task"
          style={{
            width: '34px', height: '34px', borderRadius: '50%',
            border: '2px dashed #64748b', background: 'transparent',
            color: '#f8fafc', fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          +
        </button>
      )}
    </div>
  );
}