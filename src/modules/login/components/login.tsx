import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, login } from "../../../assets/services/loginService";
import graduationCap from "../../../assets/icons/graduation-cap-solid.svg";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        setMessage('');
        try {
            const response = await login(email, password);
            console.log('Token:', response.access_token);

            // Guardar el token para futuras solicitudes
            sessionStorage.setItem('token', response.access_token);

            // Obtener el perfil del usuario
            const userProfile = await getProfile();
            console.log('Perfil del usuario:', userProfile);

            sessionStorage.setItem('userProfile', JSON.stringify(userProfile));

            navigate('/home');
        } catch (error) {
            setMessage('Error al iniciar sesión. Verifica tus credenciales.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen font-sans">
            <div id="login-container" className="bg-gray-700 p-8 rounded shadow-lg animate-slide-up">
                <h1 className="text-2xl mb-4 text-center text-white">¡Bienvenido a UMarketplace!</h1>
                <h2 className="text-lg mb-4 text-center text-white">Inicio de sesión</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center h-16">
                        <div className="loader w-8 h-8 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mb-2 p-2 bg-gray-600 text-white rounded border-transparent focus:border-transparent focus:ring-0"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mb-2 p-2 bg-gray-600 text-white rounded border-transparent focus:border-transparent focus:ring-0"
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full bg-green-700 p-2 rounded hover:opacity-80"
                        >
                            Ingresar
                        </button>
                    </div>
                )}
                {message && <p className="text-red-500 text-center mt-2">{message}</p>}

                <div className="py-4">
                    <h2 className="text-lg mb-4 text-center text-white">
                        ¿Deseas entrar con tu correo institucional?
                    </h2>
                    <button
                        onClick={() => alert('Funcionalidad no implementada')}
                        className="w-full flex justify-center gap-2 items-center bg-white text-gray-700 font-bold p-2 rounded hover:opacity-80"
                    >
                        Ingresar con cuenta educativa
                        <img src={graduationCap} className="h-4 icon-login" alt="Graduation cap" />
                    </button>
                </div>
                <div className="flex justify-center text-center mt-4 text-white">
                    <span className="pr-1">¿No tienes cuenta?</span>
                    <span className="pl-1">
                        <Link to="/register">
                            <span className="text-green-700 hover:opacity-80">
                                Regístrate aquí
                            </span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
