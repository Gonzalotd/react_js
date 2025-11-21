import { useRouteError } from "react-router"
import Menu from "./Menu";

export default function ErrorPage() {

    const error = useRouteError();

    return (
        <div id="error-page">
            <Menu />
            <h1>¡No se encontró la página que esta buscando!</h1>
            
        </div>
    )
}