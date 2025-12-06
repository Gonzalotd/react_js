
const ErrorMessage = ({ message, onClose}) => {
    return (
        <div className="error-message">
            <span>{message}</span>
            <button onClick={onClose} className="error-close-btn">X</button>
        </div>
    )
}


export default ErrorMessage;