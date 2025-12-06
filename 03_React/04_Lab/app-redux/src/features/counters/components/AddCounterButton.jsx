
import { useDispatch } from "react-redux";
import { addCounter } from '../countersSlice';

const AddCounterButton = () => {
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(addCounter())}
            style={styles.button}
        >
            ✚ Añadir nuevo contador
        </button>
    )
}

const styles = {
    button: {
      padding: '12px 24px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  };
  
  export default AddCounterButton;