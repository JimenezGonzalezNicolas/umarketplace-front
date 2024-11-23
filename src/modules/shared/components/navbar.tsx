import React, { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Navbar() {

    return (
        <>
            <div className="flex justify-center items-center w-full p-8 ">

                <div className="flex justify-start w-1/2">
                    <Link to="/home">
                        <span>
                            <h1 className="text-3xl font-bold">¡Bienvenido a UMarketplace!</h1>
                        </span>
                    </Link>
                </div>
                <div className="flex justify-end w-1/2 gap-8">
                    <Link to="/sell">
                        <span className="flex justify-center items-center gap-2 text-text-color">
                            ¡Vender!
                            <img src="../assets/icons/hand-holding-dollar-solid.svg" className="h-4 icon-home" alt="" />
                        </span>
                    </Link>
                    <Link to="/cart">
                        <span className="flex justify-center items-center gap-2 text-text-color">
                            Ver carrito
                            <img src="../assets/icons/cart-shopping-solid.svg" className="h-4 icon-home" alt="" />
                        </span>
                    </Link>
                    <Link to="/my-profile">
                        <span className="flex justify-center items-center gap-2 text-text-color">
                            Mi cuenta
                            <img src="../assets/icons/user-solid.svg" className="h-4 icon-home" alt="" />
                        </span>
                    </Link>
                    <Link to="/">
                        <span className="flex justify-center items-center gap-2 text-text-color">
                            Cerrar sesión
                            <img src="../assets/icons/right-from-bracket-solid.svg" className="h-4 icon-home" alt="" />
                        </span>
                    </Link>

                </div>
            </div>
        </>

    )
}