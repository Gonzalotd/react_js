import { useState, useRef, useCallback, useEffect } from 'react';

const useTimer = (initialTime = 0) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
    }, [isRunning]);

    const pause = useCallback(() => {
        if (isRunning) {
            setIsRunning(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [isRunning]);

    const reset = useCallback(() => {
        pause();
        setTime(initialTime);
    }, [pause, initialTime]);

    const clear = useCallback(() => {
        pause();
        setTime(0);
    }, [pause]);

    const formatTime = useCallback((totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formatNumber = (num) => num.toString().padStart(2, '0');
        
        return {
            hours: formatNumber(hours),
            minutes: formatNumber(minutes),
            seconds: formatNumber(seconds),
            totalSeconds
        };
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const formattedTime = formatTime(time);

    return {
        time: formattedTime,
        isRunning,
        start,
        pause,
        reset,
        clear,
        formattedTime: `${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}`
    };
};

export default useTimer;