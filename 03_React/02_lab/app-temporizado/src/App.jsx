import React from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>⏰ Temporizador con React Hooks</h1>
                <p>Custom Hook useTimer - Ejemplo completo</p>
            </header>
            
            <main className="App-main">
                <Timer />
            </main>
            
            <footer className="App-footer">
                <p>Implementado con useTimer custom hook</p>
            </footer>
        </div>
    );
}

export default App;