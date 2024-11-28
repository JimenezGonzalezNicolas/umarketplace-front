import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("https://api.umarketplace.cl/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el carrito");
        }

        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        setErrorMessage("Hubo un problema al cargar el carrito. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveCartItem = async (cartId: number) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`https://api.umarketplace.cl/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto del carrito");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      setErrorMessage("No se pudo eliminar el producto. Intenta nuevamente.");
    }
  };

  // const handlePurchase = async () => {
  //   try {
  //     const token = sessionStorage.getItem("token");
  //     const response = await fetch("http://localhost:3001/cart", {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Error al realizar la compra");
  //     }

  //     setCartItems([]);
  //     navigate("/success");
  //   } catch (error) {
  //     console.error("Error al realizar la compra:", error);
  //     setErrorMessage("Hubo un problema al realizar la compra. Intenta de nuevo.");
  //   }
  // };

  const handlePurchase = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("https://api.umarketplace.cl/cart/purchase", { // Cambiar a POST /cart/purchase
        method: "POST", // Cambiar a POST
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al realizar la compra");
      }
  
      setCartItems([]); // Vaciar el carrito en el frontend
      navigate("/success"); // Redirigir a la página de éxito
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      setErrorMessage("Hubo un problema al realizar la compra. Intenta de nuevo.");
    }
  };
  return (
    <div className="bg-primary-color text-white font-sans flex flex-col min-h-screen">
      <Navbar />
      <div className="py-12 flex-grow flex justify-center flex-col items-center animate-slide-up">
        <h1 className="text-3xl text-center mb-4">Carrito de Compras</h1>
        <div className="bg-secondary-color border-gray-700 border-solid p-4 rounded-lg w-full flex flex-col items-center max-w-2xl">
          {loading ? (
            <p>Cargando...</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex w-full justify-between gap-1 py-2">
                <div className="w-4/12 text-center">{item.product.name}</div>
                <div className="w-2/12 text-center">{item.quantity}</div>
                <div className="w-4/12 text-center">${item.product.price}</div>
                <button
                  className="bg-red-600 px-2 py-1 rounded hover:opacity-80 w-2/12"
                  onClick={() => handleRemoveCartItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        <div className="mt-4 flex gap-2 w-1/3">
          <Link to="/home" className="w-1/2">
            <button className="bg-gray-600 p-2 w-full rounded hover:opacity-80">
              Cancelar
            </button>
          </Link>
          <button
            onClick={handlePurchase}
            className={` p-2 rounded w-1/2 ${
              cartItems.length === 0 ? " bg-gray-600" : "hover:opacity-80 bg-green-700"
            }`}
            disabled={cartItems.length === 0}
          >
            Comprar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
