import { useState, useRef, useEffect } from "react"
import { useTaskContext } from "../context/TaskContext";

export default function TaskForm() {

    const [ inputValue, setInputValue ] = useState('');
    const { addTask } = useTaskContext();
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(inputValue);
        setInputValue('');
        inputRef.current.focus();
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input 
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ingrese la tarea" 
                className="form-container__input"
            />
            <button type="submit" className="form-container__btn">
                Agregar tarea
            </button>
        </form>
    )
}