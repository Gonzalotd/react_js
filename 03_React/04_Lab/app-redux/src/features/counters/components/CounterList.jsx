import { useSelector } from "react-redux"
import Counter from "./Counter"


const CounterList = () => {
    const counters = useSelector(state => state.counters)

    if ( counters.length === 0) {
        return (
            <div style={styles.emptyState}>
                <p>No existen contadores, ¡Añade un contador!</p>
            </div>
        )
    }

    return (
        <div style={styles.listContainer}>
            <h3 style={styles.title}>
                Contadores Activos: {counters.length}
            </h3>
            {counters.map(counter => (
                <Counter 
                    key={counter.id}
                    id={counter.id}
                    value={counter.value}
                />
            ))                
            }
        </div>
    )
}

const styles = {
    listContainer: {
      marginTop: '24px',
    },
    title: {
      color: '#343a40',
      marginBottom: '16px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '32px',
      color: '#6c757d',
      backgroundColor: '#e9ecef',
      borderRadius: '8px',
      marginTop: '24px',
    },
  };

  export default CounterList;