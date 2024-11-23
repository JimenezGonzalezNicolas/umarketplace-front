import { Link } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";
export default function Cart() {

    return (
        <div className="bg-primary-color text-white font-sans">
            <Navbar/>
            <div className="py-12 flex-grow flex justify-center flex-col">
                <h1 className="text-3xl text-center mb-4">Carrito de Compras</h1>
                <div className="bg-secondary-color border-gray-700 border-solid p-4 rounded-lg w-full flex justify-center flex-col items-center">
                    <div className="flex w-1/2 justify-between py-2">
                        <span>Producto 1</span>
                        <span>$10.000</span>
                    </div>
                    <div className="flex w-1/2 justify-between py-2">
                        <span>Producto 1</span>
                        <span>$10.000</span>
                    </div>
                    <div className="flex w-1/2 justify-between py-2">
                        <span>Producto 1</span>
                        <span>$10.000</span>
                    </div>
                    <div className="flex w-1/2 justify-between border-b border-gray-700 py-2">
                        <span>Producto 1</span>
                        <span>$10.000</span>
                    </div>
                    <div className="flex w-1/2 justify-between py-2">
                        <span>Total</span>
                        <span>$10.000</span>
                    </div>

                    <div className="mt-4 flex gap-2 w-1/4">

                        <span className="w-1/2 hover:opacity-80">
                            <Link to="/home">
                                <button className="bg-gray-600 p-2 rounded w-full">Cancelar</button>
                            </Link>
                        </span>
                        <span className="w-1/2 hover:opacity-80">
                            <Link to="/home">
                                <button className="bg-green-700 p-2 rounded w-full">Comprar</button>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
        
    )
}