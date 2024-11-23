import { Link } from "react-router";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/footer";


export default function Profile() {

    return (
        <>
            <Navbar />
            <div className="transition duration-700 ease-in-out transform hidden-opacity flex justify-center items-center min-h-screen">

                <div className="bg-gray-700 p-8 rounded shadow-lg w-1/3">
                    <h2 className="text-xl mb-4 text-white font-bold">Actualizar Información</h2>
                    <span className="text-white my-4">
                        Contraseña
                    </span>
                    <input type="password" placeholder="Nueva Contraseña" className="w-full mb-4 p-2 bg-gray-600 text-white rounded" />
                    <span className="text-white my-4">
                        Imagen de perfil
                    </span>
                    <input type="file" className="w-full mb-4 p-2 bg-gray-600 text-white rounded" accept="image/*" />
                    <Link to="/home">
                        <button className="w-full bg-green-700 p-2 rounded hover:opacity-80">Actualizar Perfil</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}