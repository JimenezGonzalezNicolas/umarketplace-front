import React from "react";
import { Product } from "../../../assets/interfaces/product";

interface ModalProductProps {
  isOpen: boolean;
  modalType: string;
  product?: Product | null;
  formData: { name: string; price: string; description: string; stock: string };
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
  isOpen,
  modalType,
  product,
  formData,
  onClose,
  onSave,
  onDelete,
  onInputChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-1/3 animate-slide-up">
        {modalType === "edit" || modalType === "create" ? (
          <>
            <h2 className="text-xl text-white font-bold mb-4">
              {modalType === "edit" ? "Editar Producto" : "Publicar Producto"}
            </h2>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={formData.name}
              onChange={onInputChange}
              name="name"
              className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
            />
            <input
              type="number"
              placeholder="Precio"
              value={formData.price}
              onChange={onInputChange}
              name="price"
              className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
            />
            <textarea
              placeholder="Descripción del producto"
              value={formData.description}
              onChange={onInputChange}
              name="description"
              className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
            ></textarea>
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={onInputChange}
              name="stock"
              className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="bg-red-700 text-white p-2 rounded hover:opacity-80"
              >
                Cancelar
              </button>
              <button
                onClick={onSave}
                className="bg-green-700 text-white p-2 rounded hover:opacity-80"
              >
                Guardar
              </button>
            </div>
          </>
        ) : modalType === "delete" ? (
          <>
            <h2 className="text-xl text-white font-bold mb-4">¿Deseas eliminar este producto?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="bg-gray-600 text-white p-2 rounded hover:opacity-80"
              >
                Cancelar
              </button>
              <button
                onClick={onDelete}
                className="bg-red-700 text-white p-2 rounded hover:opacity-80"
              >
                Eliminar
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ModalProduct;
