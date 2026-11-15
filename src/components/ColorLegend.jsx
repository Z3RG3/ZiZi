import { useState } from 'react';

export default function ColorLegend({ tasks, activeTaskId, onSelectTask, onUpdateTask, onDeleteTask, onAddTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
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
        const isEditing = editingTaskId === task.id;

        return (
          <div key={task.id} style={{ position: 'relative' }}>
            {/* Double-click popup editor for Rename, Color, & Delete ( [X] ) */}
            {isEditing && (
              <div style={{
                position: 'absolute', bottom: '125%', left: '50%', transform: 'translateX(-50%)',
                background: '#1e293b', padding: '10px', borderRadius: '10px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 20,
                border: '1px solid #475569', width: '180px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>Edit Task</span>
                  <button
                    onClick={() => {
                      onDeleteTask(task.id);
                      setEditingTaskId(null);
                    }}
                    title="Delete task"
                    style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', width: '20px', height: '20px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ✕
                  </button>
                </div>

                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => onUpdateTask(task.id, { name: e.target.value })}
                  style={{ padding: '4px 6px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '13px', outline: 'none' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={task.color}
                    onChange={(e) => onUpdateTask(task.id, { color: e.target.value })}
                    style={{ width: '36px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }}
                  />
                  <button
                    onClick={() => setEditingTaskId(null)}
                    style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px 8px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => onSelectTask(task.id)}
              onDoubleClick={() => setEditingTaskId(isEditing ? null : task.id)}
              title="Click to select, double-click to rename/recolor/delete"
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

      {/* (+) Add Task Button */}
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
              outline: 'none', fontSize: '14px', width: '130px', background: '#fff', color: '#1e293b'
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