import React from 'react';

const Filter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'Todas' },
    { key: 'active', label: 'Pendientes' },
    { key: 'completed', label: 'Completadas' }
  ];

  return (
    <div className="filter-container">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;