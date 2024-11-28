import { useState, useEffect } from "react";
import ProductCard from "../components/card";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/footer";
import productService from "../../../assets/services/productService";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userName = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userProfile = JSON.parse(sessionStorage.getItem("userProfile") || "{}");
        const campus = userProfile?.campus;

        if (campus) {
          const response = await productService.getProductsByCampus(campus);
          setProducts(response);
        } else {
          console.error("No se encontró el campus del usuario en sessionStorage.");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Navbar />
      <div className="flex-grow max-h-screen overflow-auto animate-slide-up">
        <div className="w-full flex justify-start py-2 px-8">
          {products.length > 0 && (
            <p className="w-full text-xl">🔥 Populares en tu campus 🔥</p>
          )}
          {products.length < 1 && (
            <div className="flex flex-col gap-2">
              <p className="w-full text-2xl">De momento no hay nada por aquí 😬</p>
              <p className="w-full text-xl">
                <span className="pr-1">Vuelve en un momento,</span>
                <span className="text-green-700">muy pronto tendremos novedades para ti 💯</span>
              </p>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-wrap justify-center gap-4">
          {loading ? (
            <p className="text-white">Cargando productos...</p>
          ) : (
            products.map((product, index) => <ProductCard key={index} product={product} />)
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
