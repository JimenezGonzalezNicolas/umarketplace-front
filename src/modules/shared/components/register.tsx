import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/footer";
import { Link } from "react-router";

export default function Register() {

    return (
        <>
            <div className="flex items-center justify-center h-screen font-sans ">
                <div id="register-container" className="bg-gray-700 p-8 rounded shadow-lg hidden-opacity">
                    <h1 className="text-2xl mb-4 text-center">Registro</h1>
                    <input type="text" placeholder="Usuario" className="w-full mb-2 p-2 bg-gray-600 text-white rounded" />
                    <input type="email" placeholder="Correo" className="w-full mb-2 p-2 bg-gray-600 text-white rounded" />
                    <input type="password" placeholder="Contraseña" className="w-full mb-2 p-2 bg-gray-600 text-white rounded" />
                    <button type="submit" className="w-full bg-green-700 p-2 rounded hover:opacity-80">Registrarse</button>
                    <p className="text-center mt-4">
                        ¿Ya tienes cuenta?
                        <Link to="/">
                            <span className="text-green-700 hover:opacity-80">
                                Inicia sesión
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}