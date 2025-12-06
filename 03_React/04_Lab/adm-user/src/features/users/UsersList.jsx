import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomUser, removeUser, selectUser, clearError } from './usersSlice';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error, selectedUserId } = useSelector((state) => state.users);

  const handleAddUser = () => {
    dispatch(fetchRandomUser());
  };

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };

  const handleSelectUser = (id) => {
    dispatch(selectUser(id));
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  return (
    <div className="users-container">
      <h1>Agenda de Usuarios</h1>
      
      <div className="controls">
        <button 
          className="add-user-btn" 
          onClick={handleAddUser}
          disabled={loading}
        >
          {loading ? 'Obteniendo...' : 'Agregar Usuario Aleatorio'}
        </button>
        
        <div className="stats">
          <p>Total de usuarios: {users.length}</p>
          {selectedUserId && <p>Usuario seleccionado: {
            users.find(u => u.id === selectedUserId)?.firstName || 'Ninguno'
          }</p>}
        </div>
      </div>

      {loading && <Spinner />}
      
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={handleCloseError} 
        />
      )}

      {users.length === 0 && !loading ? (
        <div className="empty-state">
          <p>No hay usuarios en la agenda. ¡Agrega uno!</p>
        </div>
      ) : (
        <div className="users-list">
          <h2>Lista de Usuarios ({users.length})</h2>
          <div className="users-grid">
            {users.map((user) => (
              <div 
                key={user.id} 
                className={`user-card ${selectedUserId === user.id ? 'selected' : ''}`}
                onClick={() => handleSelectUser(user.id)}
              >
                <div className="user-header">
                  <img 
                    src={user.picture} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="user-avatar"
                  />
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveUser(user.id);
                    }}
                    title="Eliminar usuario"
                  >
                    ×
                  </button>
                </div>
                <div className="user-info">
                  <h3>{user.firstName} {user.lastName}</h3>
                  <p className="user-id">ID: {user.id.substring(0, 8)}...</p>
                </div>
                <div className="user-footer">
                  <span className="user-status">
                    {selectedUserId === user.id ? 'Seleccionado' : 'Haz clic para seleccionar'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;