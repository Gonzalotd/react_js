import { Outlet, useNavigate } from "react-router"
import Menu from "./Menu"
import { setAuth } from "../auth";

export default function Profile() {

    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(false);
        navigate('/');
    }

    return (
        <div>
            <Menu />
            <h1>Perfil de Usuario</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>

            <Outlet />
        </div>
    )
}