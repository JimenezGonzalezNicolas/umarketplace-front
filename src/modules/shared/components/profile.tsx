import React, { useEffect, useState } from "react";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/footer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        career: "",
        campus: "",
        phone: "",
        password: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProfile = sessionStorage.getItem("userProfile");
        if (storedProfile) {
            setProfileData(JSON.parse(storedProfile));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch("https://api.umarketplace.cl/students/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    phone: profileData.phone,
                    password: profileData.password,
                }),
            });
            if (!response.ok) throw new Error("Error al actualizar el perfil");
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center animate-slide-up">
                <div className="bg-gray-700 p-8 rounded shadow-lg w-full max-w-lg">
                    <h2 className="text-xl mb-4 text-white font-bold">Actualizar Información</h2>

                    <label className="text-white my-4 block">Nombre</label>
                    <input
                        type="text"
                        value={profileData.name}
                        disabled
                        className="w-full mb-4 p-2 bg-gray-600 text-white rounded opacity-50"
                    />

                    <label className="text-white my-2 block">Correo Electrónico</label>
                    <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full mb-4 p-2 bg-gray-600 text-white rounded opacity-50"
                    />

                    <label className="text-white my-2 block">Carrera</label>
                    <input
                        type="text"
                        value={profileData.career}
                        disabled
                        className="w-full mb-4 p-2 bg-gray-600 text-white rounded opacity-50"
                    />

                    <label className="text-white my-2 block">Campus</label>
                    <input
                        type="text"
                        value={profileData.campus}
                        disabled
                        className="w-full mb-4 p-2 bg-gray-600 text-white rounded opacity-50"
                    />

                    <label className="text-white my-2 block">Teléfono</label>
                    <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
                    />

                    <label className="text-white my-2 block">Nueva Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={profileData.password}
                        onChange={handleInputChange}
                        placeholder="Nueva Contraseña"
                        className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
                    />

                    <button
                        onClick={handleUpdate}
                        className="w-full bg-green-700 my-4 p-2 rounded hover:opacity-80"
                    >
                        Actualizar Perfil
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <div className="bg-gray-700 p-6 rounded shadow-lg w-1/3 text-center">
                        <h2 className="text-2xl text-white mb-4">
                            Perfil actualizado con éxito
                        </h2>
                        <p className="text-white mb-4">
                            Tu sesión se cerrará para aplicar los cambios.
                        </p>
                        <button
                            onClick={handleLogout}
                            className="bg-green-700 text-white w-full px-6 py-2 rounded hover:opacity-80"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
