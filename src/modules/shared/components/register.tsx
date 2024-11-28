import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../assets/services/loginService";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    career: "",
    campus: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await register(formData);
      setMessage("Registro exitoso. Redirigiendo al inicio de sesión...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage("Error al registrarse. Por favor, verifica los datos.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen font-sans animate-slide-up">
        <div id="register-container" className="bg-gray-700 p-8 rounded shadow-lg w-full lg:w-1/2">
          <h1 className="text-2xl mb-4 text-center text-white">Registro</h1>

          <input
            type="text"
            name="name"
            placeholder="Nombre Completo"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded"
          />

          <input
            type="text"
            name="career"
            placeholder="Carrera"
            value={formData.career}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded"
          />

          <input
            type="text"
            name="campus"
            placeholder="Campus"
            value={formData.campus}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 bg-gray-600 text-white rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 p-2 rounded hover:opacity-80"
          >
            Registrarse
          </button>

          {message && <p className="text-center mt-4 text-white">{message}</p>}

          <p className="text-center mt-4 text-white">
            ¿Ya tienes cuenta?{" "}
            <Link to="/" className="text-green-700 hover:opacity-80">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
