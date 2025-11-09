import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskContext();

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="delete-btn"
      >
        Eliminar
      </button>
    </li>
  );
};

export default TaskItem;