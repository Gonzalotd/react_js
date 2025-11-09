import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = ({ filter }) => {
  const { tasks } = useTaskContext();

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = safeTasks.filter(task => {
    if (!task || typeof task.completed !== 'boolean') return false;
    
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'active':
        return !task.completed;
      default:
        return true;
    }
  });

  const getEmptyMessage = () => {
    switch (filter) {
      case 'completed':
        return 'No hay tareas completadas';
      case 'active':
        return 'No hay tareas pendientes';
      default:
        return 'No hay tareas';
    }
  };

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p className="no-tasks">{getEmptyMessage()}</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;