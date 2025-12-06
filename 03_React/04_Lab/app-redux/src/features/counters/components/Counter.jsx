import { useDispatch } from "react-redux";
import { removeCounter, increment, decrement } from '../countersSlice';

const Counter = ({ id, value }) => {
    const dispatch = useDispatch();

    return(
        <div style={styles.counterContainer}>
            <div style={styles.counterInfo}>
                <span style={styles.counterId}>ID: {id.slice(0,8 )}</span>
                <span style={styles.counterValue}>Valor: {value}</span>
            </div>
            <div style={styles.buttonGroup}>
                <button
                    onClick={() => dispatch(decrement(id))}
                    style={styles.button}
                >
                    -
                </button>
                <button
                    onClick={() => dispatch(increment(id))}
                    style={styles.button}
                >
                    +
                </button>
                <button 
                onClick={() => dispatch(removeCounter(id))}
                style={{ ...styles.button, ...styles.deleteButton }}
                >
                Eliminar
                </button>
            </div>
        </div>
    )
}

const styles = {
    counterContainer: {
      border: '2px solid #4a90e2',
      borderRadius: '8px',
      padding: '16px',
      margin: '12px 0',
      backgroundColor: '#f8f9fa',
    },
    counterInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
    },
    counterId: {
      color: '#6c757d',
      fontSize: '14px',
    },
    counterValue: {
      color: '#28a745',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px',
    },
    button: {
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
      flex: 1,
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
  };
  

  export default Counter;