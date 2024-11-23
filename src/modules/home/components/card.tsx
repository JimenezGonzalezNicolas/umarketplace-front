import React from "react";
import papimicky from "../../../assets/img/micky.jpg"
import { Link } from "react-router";

export default function ProductCard() {
    return (
        <div className="bg-gray-700 rounded-lg shadow-lg max-w-xs">
            <img src={papimicky} alt="Producto 1" className="w-full h-32 object-cover rounded-lg" />
            <div className="h-auto p-4">
                <h2 className="text-xl text-white mt-2 font-bold">Producto 1</h2>
                <div className="flex justify-start items-center gap-2 py-2">
                    <img src={papimicky} alt="" className="h-6 w-6 rounded-full" />
                    <span className="text-sm text-white">
                        Juan Pérez
                    </span>

                </div>
                <p className="text-lg text-white font-bold">$10.000</p>
                <div className="w-full h-auto flex-col justify-center gap-2">
                    <button className="mt-2 w-full bg-gray-600 p-2 rounded hover:opacity-80">Ver detalle</button>
                    <button className="mt-2 w-full bg-green-700 p-2 rounded hover:opacity-80">Agregar al carrito</button>
                    <Link to="/report">
                        <div className="text-sm text-gray-300 p-1 flex justify-center items-center">
                            <p className="mt-2 w-full text-center hover:opacity-70">Reportar artículo indebido</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}