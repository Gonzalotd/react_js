import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { taskReducer, initialState } from '../reducers/taskReducer';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const loadTasks = () => {
      try {
        const savedTasks = localStorage.getItem('tasks');
        
        if (savedTasks && 
            savedTasks !== 'undefined' && 
            savedTasks !== 'null' && 
            savedTasks !== '' &&
            savedTasks !== '[]') {
          
          const parsedTasks = JSON.parse(savedTasks);
          
          if (Array.isArray(parsedTasks)) {
            dispatch({ type: 'LOAD_TASKS', payload: parsedTasks });
            return;
          }
        }
        
        dispatch({ type: 'LOAD_TASKS', payload: [] });
        
      } catch (error) {
        localStorage.removeItem('tasks');
        dispatch({ type: 'LOAD_TASKS', payload: [] });
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    try {
      if (Array.isArray(state.tasks)) localStorage.setItem('tasks', JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Error al guardar tareas en localStorage:', error);
    }
  }, [state.tasks]);

  const addTask = (text) => {
    if (text && text.trim()) dispatch({ type: 'ADD_TASK', payload: text.trim() });
  };

  const toggleTask = (id) => dispatch({ type: 'TOGGLE_TASK', payload: id });

  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });

  const value = {
    tasks: state.tasks || [],
    addTask,
    toggleTask,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};