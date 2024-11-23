import { useState } from "react";
import ProductCard from "../components/card";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/footer";

export default function Home() {
    const [totalCards, setTotalCards] = useState(Array.from({ length: 12 }, (_, i) => i));

    return (
        <>
            <Navbar />
            <div className="flex-grow max-h-screen overflow-auto">
                <div className="w-full flex justify-start py-2 px-8">
                    <p className="w-full text-xl">🔥 Populares en este momento 🔥</p>
                </div>
                <div className="p-4 flex flex-wrap justify-center gap-4">
                    {totalCards.map((item, index) => (
                        <ProductCard key={index} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
