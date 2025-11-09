import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [currentFilter, setCurrentFilter] = useState('all');

  return (
    <TaskProvider>
      <div className="app">
        <header className="app-header">
          <h1>Lista de Tareas</h1>
          <p>Gestiona tus tareas diarias</p>
        </header>
        
        <main className="app-main">
          <TaskForm />
          
          <Filter 
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />
          
          <TaskList filter={currentFilter} />
        </main>
        
        <footer className="app-footer">
          <p>Usando React Hooks: useReducer, useContext, useRef, useEffect, useState</p>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;