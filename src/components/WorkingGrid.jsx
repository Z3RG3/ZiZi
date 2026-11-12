export default function WorkingGrid({ cols, rows, gridState, tasks, activeTaskId, onSquareClick }) {
    const rectangularTotal = cols * rows;
    const squares = Array.from({ length: rectangularTotal }, (_, index) => index);
  
  const getTaskColor = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    return task ? task.color : '#f1f5f9'; // Soft paper-like empty color
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 22px)`,
        gap: '5px',
        padding: '20px',
        background: '#f1e3b1',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        width: 'fit-content',
      }}
    >
      {squares.map((index) => {
        const assignedTaskId = gridState[index];
        const backgroundColor = assignedTaskId ? getTaskColor(assignedTaskId) : '#f8fafc';

        return (
          <button
            key={index}
            onClick={() => onSquareClick(index)}
            title={`Square ${index + 1}`}
            style={{
              width: '22px',
              height: '22px',
              backgroundColor: backgroundColor,
              border: assignedTaskId ? 'none' : '1px dashed #cbd5e1', // Dashed border for empty notebook squares!
              borderRadius: '4px',
                /* TODO: Custom abstract fill shapes (blob, circle, organic squircle)
                    We can map each square index to a deterministic or random preset:
                    e.g., borderRadius: assignedTaskId ? getRandomBlobRadius(index) : '4px'
                    or render an inline <svg> shape inside the button when assignedTaskId is truthy */
              cursor: 'pointer',
              transition: 'transform 0.1s ease, background-color 0.1s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />
        );
      })}
    </div>
  );
}