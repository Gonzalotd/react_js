import React from 'react';
import useTimer from '../hooks/useTimer';

const Timer = () => {
    const {
        time,
        isRunning,
        start,
        pause,
        reset,
        clear,
        formattedTime
    } = useTimer(0);

    return (
        <div className="timer-container">
            <div className="timer-display">
                <h1 className="timer-time">{formattedTime}</h1>
                <div className="timer-details">
                    <span>Horas: {time.hours}</span>
                    <span>Minutos: {time.minutes}</span>
                    <span>Segundos: {time.seconds}</span>
                </div>
            </div>
            
            <div className="timer-controls">
                {!isRunning ? (
                    <button 
                        className="timer-btn timer-btn-start"
                        onClick={start}
                    >
                        ▶ Iniciar
                    </button>
                ) : (
                    <button 
                        className="timer-btn timer-btn-pause"
                        onClick={pause}
                    >
                        ⏸ Pausar
                    </button>
                )}
                
                <button 
                    className="timer-btn timer-btn-reset"
                    onClick={reset}
                    disabled={time.totalSeconds === 0}
                >
                    🔄 Reiniciar
                </button>
                
                <button 
                    className="timer-btn timer-btn-clear"
                    onClick={clear}
                >
                    🗑 Resetear
                </button>
            </div>
            
            <div className="timer-status">
                <p>Estado: {isRunning ? '⏱ En marcha' : '⏸ Pausado'}</p>
                <p>Tiempo total: {time.totalSeconds} segundos</p>
            </div>
        </div>
    );
};

export default Timer;