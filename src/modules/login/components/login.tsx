import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import graduationCap from "../../../assets/icons/graduation-cap-solid.svg"


export default function Login() {
    useEffect(() => {
        const correo = localStorage.getItem('correo_aiep');
        const clave = localStorage.getItem('clave_aiep');

        console.log('Correo aiep:', correo);
        console.log('clave aiep:', clave);
    })
    return (
        <div className="flex items-center justify-center h-screen font-sans bg-gray-900">
            <div id="login-container" className="bg-gray-700 p-8 rounded shadow-lg hidden-opacity">
                <h1 className="text-2xl mb-4 text-center text-white">¡Bienvenido a UMarketplace!</h1>
                <h2 className="text-lg mb-4 text-center text-white">Inicio de sesión</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Usuario"
                        className="w-full mb-2 p-2 bg-gray-600 text-white rounded border-transparent focus:border-transparent focus:ring-0"

                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full mb-2 p-2 bg-gray-600 text-white rounded border-transparent focus:border-transparent focus:ring-0"
                    />
                    <Link to="/home">
                        <button className="w-full bg-green-700 p-2 rounded hover:opacity-80">
                            Ingresar
                        </button>
                    </Link>
                </div>

                <div className="py-4">
                    <h2 className="text-lg mb-4 text-center text-white">
                        ¿Tienes algún método alternativo?
                    </h2>
                    <Link to="/home">
                        <button className="w-full flex justify-center gap-2 items-center bg-white text-gray-700 font-bold p-2 rounded hover:opacity-80">
                            Ingresar con cuenta educativa
                            <img src={graduationCap}
                                className="h-4 icon-login"
                                alt="Graduation cap"
                            />
                        </button>
                    </Link>
                </div>
                <div className="flex justify-center text-center mt-4 text-white">
                    <span className="pr-1">
                        ¿No tienes cuenta?
                    </span>

                    <Link to="/register" className="text-green-700 hover:opacity-80">
                        <span className="pl-1">
                            Regístrate aquí
                        </span>

                    </Link>
                </div>
            </div>
        </div>
    );
}
