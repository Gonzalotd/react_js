
import './App.css'
import AddCounterButton from './features/counters/components/AddCounterButton'
import CounterList from './features/counters/components/CounterList'

function App() {

	return (
		<div style={styles.appContainer}>
			<header style={styles.header}>
				<h1 style={styles.title}>Gestor de Contadores</h1>
				<p style={styles.subtitle}>
				Gestiona múltuples contadores independientes con Redux Toolkit
				</p>
			</header>

			<main style={styles.mainContent}>
				<AddCounterButton />
				<CounterList />
			</main>

			<footer style={styles.footer}>
				<p>App de implementación con React + Redux Toolkit</p>
			</footer>
		</div>
	)
}

const styles = {
	appContainer: {
		minHeight: '100vh',
		backgroundColor: '#f5f5f5',
		padding: '20px',
	},
	header: {
		textAlign: 'center',
		marginBottom: '32px',
	},
	title: {
		color: '#2c3e50',
		fontSize: '2.5rem',
		marginBottom: '8px',
	},
	subtitle: {
		color: '#7f8c8d',
		fontSize: '1.2rem',
	},
	mainContent: {
		maxWidth: '600px',
		margin: '0 auto',
	},
	footer: {
		textAlign: 'center',
		marginTop: '40px',
		color: '#95a5a6',
		fontSize: '0.9rem',
	},
};

export default App
