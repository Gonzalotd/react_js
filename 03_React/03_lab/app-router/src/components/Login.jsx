import { useNavigate } from "react-router";
import { setAuth } from "../auth"

export default function Login() {

    const navigate = useNavigate()

    const handlelogin = () => {
        setAuth(true);
        navigate('/profile');
    }

    return (
        <div>
            <h1>Inicio de Sesión</h1>
            <button onClick={handlelogin}>Iniciar Login</button>
        </div>
    )
}