import { useCallback, useRef, useState } from "react";

export default function useTimer() {

    const [play, setPlay] = useState(true);
    const [hour, setHour] = useState('00');
    const [minuts, setMinuts] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const totalSegundos = useRef(0);
    const intervalRef = useRef(0);

    const validar = useCallback( (val) => {
        const value = val.toString();
        return value.length < 2 ? "0" + value : value;
    }, [])
     
    const setTime = useCallback(() => {
        totalSegundos.current += 1

        const horas = Math.floor(totalSegundos.current / 3600);
        const minutos = Math.floor((totalSegundos.current % 3600) / 60)
        const segundos = totalSegundos.current % 60

        setHour(validar(horas));
        setMinuts(validar(minutos));
        setSeconds(validar(segundos));
    }, [validar])

    const playControl = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef);

        intervalRef.current = setInterval(setTime, 1000);
        setPlay(false);
    }, [setTime])

    const pauseControl = useCallback(() => {
        if ( intervalRef.current ) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setPlay(true);
    }, [])

    const resetControl = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        totalSegundos.current = 0;
        setHour('00');
        setMinuts('00');
        setSeconds('00');
        setPlay(true);
    }, []);


    return {
        play,
        playControl,
        pauseControl,
        hour,
        minuts,
        seconds, 
        resetControl
    }
}