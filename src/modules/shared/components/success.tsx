import { Link } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Success() {
    return (
        <div className="bg-primary-color text-white font-sans flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center animate-slide-up">
                <div className="text-center">
                    <h1 className="text-3xl mb-4">¡Compra exitosa!</h1>
                    <p className="mb-4">Gracias por tu compra.</p>
                    <Link to="/home">
                        <span className="mt-8 text-green-700 p-2 hover:opacity-80">
                            Volver al Home
                        </span>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
