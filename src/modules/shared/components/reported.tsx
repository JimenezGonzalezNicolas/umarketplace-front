import React, { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Link } from "react-router";
export default function Reported() {
    const [isExploding, setIsExploding] = useState(false);

    return (
        <div className="flex items-center justify-center h-screen bg-primary-color text-white font-sans">
            <div className="text-center">
                <h1 className="text-3xl mb-4">Se ha reportado el producto como indebido</h1>
                <p className="mb-4">Gracias por hacer de UMarketplace un lugar seguro.</p>
                <Link
                    to={{
                        pathname: "/home",
                        search: "?query=string",
                        hash: "#hash",
                    }}
                />
                <Link to="/home"><span className="mt-8 text-green-700 p-2 hover:opacity-80">
                    Volver al Home
                </span>
                </Link>
            </div>
        </div>
    )
}