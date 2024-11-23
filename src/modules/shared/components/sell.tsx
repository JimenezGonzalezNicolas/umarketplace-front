import Footer from "./footer"
import Navbar from "./navbar"
export default function Sell() {

    return (
        <>
            <div className="h-screen flex flex-col justify-center">
                <Navbar />
                <div id="upload-container" className="flex-grow flex-col transition duration-700 ease-in-out transform hidden-opacity flex justify-center items-center">
                    <div className="flex justify-start p-4 bg-accent-color text-white text-center pt-4">
                        <h1 className="text-3xl font-bold">Sube tu Producto</h1>
                    </div>
                    <div className="bg-gray-700 p-8 rounded shadow-lg w-1/3">
                        <h2 className="text-xl mb-4 text-white font-bold">Información del producto</h2>
                        <input type="text" placeholder="Nombre del producto" className="w-full mb-4 p-2 bg-gray-600 text-white rounded" />
                        <input type="number" placeholder="Precio" className="w-full mb-4 p-2 bg-gray-600 text-white rounded" />
                        <textarea placeholder="Descripción del producto" className="w-full mb-4 p-2 bg-gray-600 text-white rounded"></textarea>
                        <input type="file" className="w-full mb-4 p-2 bg-gray-600 text-white rounded" accept="image/*" />
                        <a href="success-item.html">
                            <button className="w-full bg-green-700 p-2 rounded hover:opacity-80">Publicar Producto</button>
                        </a>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}