import React, { useState } from "react";
import { sendReport } from "../../../assets/services/reportService";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    student: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Nuevo estado para el modal de éxito
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const handleReportSubmit = async () => {
    setIsSubmitting(true);
    try {
      await sendReport({
        productId: product.id,
        reason: reportReason,
        description: reportDetails,
      });

      setIsReportModalOpen(false);
      setIsSuccessModalOpen(true); // Mostrar modal de éxito
    } catch (error) {
      console.error("Error al enviar el reporte:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("https://api.umarketplace.cl/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto al carrito");
      }

      setIsDetailModalOpen(false);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-700 rounded-lg shadow-lg max-w-xs w-64 h-auto flex flex-col">
        <img
          src={"https://via.placeholder.com/150"} // Imagen temporal
          alt={product.name}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <div className="flex-grow p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl text-white font-bold truncate">{product.name}</h2>
            <div className="flex justify-start items-center gap-2 py-2">
              <img
                src={"https://via.placeholder.com/32"} // Placeholder para el avatar
                alt={product.student.name}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-sm text-white truncate">{product.student.name}</span>
            </div>
            <p className="text-sm text-gray-300 truncate">{product.description}</p>
          </div>
          <div>
            <p className="text-lg text-white font-bold">{formatPrice(product.price)}</p>
            <button
              onClick={() => setIsDetailModalOpen(true)}
              className="mt-2 w-full bg-green-700 p-2 rounded hover:opacity-80"
            >
              Ver detalle
            </button>
            <div
              onClick={() => setIsReportModalOpen(true)}
              className="text-sm text-gray-300 p-1 flex justify-center items-center cursor-pointer"
            >
              <p className="mt-2 w-full text-center hover:opacity-70">
                Reportar artículo indebido
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalle del producto */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 animate-slide-up">
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-1/3 text-white">
            <img
              src={"https://via.placeholder.com/150"} // Imagen temporal
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg my-2"
            />
            <h2 className="text-2xl mb-4">{product.name}</h2>
            <p className="text-lg">{product.description}</p>
            <p className="text-lg font-bold mt-4">Precio: {formatPrice(product.price)}</p>
            <div className="flex justify-center gap-1">
              <button
                onClick={handleAddToCart}
                className="mt-4 bg-green-700 p-2 w-1/2 rounded hover:opacity-80"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="mt-4 bg-gray-600 w-1/2 p-2 rounded hover:opacity-80"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de reporte */}
      {isReportModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 animate-slide-up">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl text-white font-bold mb-4">Reportar artículo</h2>
            <label htmlFor="reason" className="block text-sm text-white mb-2">
              Motivo del reporte
            </label>
            <select
              id="reason"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
            >
              <option value="">Selecciona un motivo</option>
              <option value="Contenido ofensivo">Contenido ofensivo</option>
              <option value="Artículo no permitido">Artículo no permitido</option>
              <option value="Spam">Spam</option>
              <option value="Otro">Otro</option>
            </select>
            <label htmlFor="details" className="block text-sm text-white mb-2">
              Detalles adicionales
            </label>
            <textarea
              id="details"
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              placeholder="Escribe detalles adicionales sobre el reporte"
              className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
            ></textarea>
            <div className="flex justify-center gap-1">
              <button
                onClick={handleReportSubmit}
                disabled={isSubmitting}
                className={`bg-green-700 px-4 w-1/2 py-2 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                  }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar reporte"}
              </button>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="bg-gray-500 px-4 w-1/2 py-2 rounded hover:opacity-80 text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 animate-slide-up">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-1/3 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">¡Gracias!</h2>
            <p className="text-lg">Tu reporte ha sido enviado con éxito.</p>
            <p className="mt-2">Con tu ayuda hacemos una comunidad más segura y amigable.</p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="mt-4 bg-green-700 px-4 py-2 rounded hover:opacity-80"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
