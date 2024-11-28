import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpia el sessionStorage
    sessionStorage.clear();
    // Redirige al usuario al login
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center items-center w-full p-8">
        <div className="flex justify-start w-1/2">
          
            <span>
              <h1 className="text-3xl font-bold">UMarketplace</h1>
            </span>
          
        </div>
        <div className="flex justify-end w-1/2 gap-8">
        <Link to="/home">
            <span className="flex justify-center items-center gap-2 text-text-color hover:opacity-80">
              Comprar
              <img src="../assets/icons/hand-holding-dollar-solid.svg" className="h-4 icon-home" alt="" />
            </span>
          </Link>
          <Link to="/sell">
            <span className="flex justify-center items-center gap-2 text-text-color hover:opacity-80">
              Mis ventas
              <img src="../assets/icons/hand-holding-dollar-solid.svg" className="h-4 icon-home" alt="" />
            </span>
          </Link>
          <Link to="/cart">
            <span className="flex justify-center items-center gap-2 text-text-color hover:opacity-80">
              Ver carrito
              <img src="../assets/icons/cart-shopping-solid.svg" className="h-4 icon-home" alt="" />
            </span>
          </Link>
          <Link to="/my-profile">
            <span className="flex justify-center items-center gap-2 text-text-color hover:opacity-80">
              Mi cuenta
              <img src="../assets/icons/user-solid.svg" className="h-4 icon-home" alt="" />
            </span>
          </Link>
          <span
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center gap-2 text-text-color cursor-pointer hover:opacity-80"
          >
            Cerrar sesión
            <img src="../assets/icons/right-from-bracket-solid.svg" className="h-4 icon-home" alt="" />
          </span>
        </div>
      </div>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 animate-slide-up">
          <div className="flex flex-col justify-center items-center bg-gray-700 p-6 rounded shadow-lg w-1/2 text-center">
            <h2 className="text-2xl text-white mb-4 p-4">¿Estás seguro de querer salir?</h2>
            <div className="flex justify-center w-full gap-1">
              <button
                onClick={handleLogout}
                className="bg-green-700 text-white w-1/2 px-6 py-2 rounded hover:opacity-80"
              >
                Salir
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white w-1/2 px-6 py-2 rounded hover:opacity-80"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
