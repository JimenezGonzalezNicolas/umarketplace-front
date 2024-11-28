import { useState, useEffect } from "react";
import Navbar from "../../shared/components/navbar";
import Footer from "../../shared/components/footer";
import StudentProductCard from "../components/product-card";
import {
getProductsByStudentId,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  createProduct,
} from "../../../assets/services/productService";
import { getProfile } from "../../../assets/services/loginService";
import { Product } from "../../../assets/interfaces/product";

interface FormData {
  name: string;
  price: string;
  description: string;
  stock: string;
}

export default function SellerProfile() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "create" | "delete" | "">("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const products = await getProductsByStudentId();
            setProducts(products);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };    

    fetchData();
}, []);

  const handleOpenModal = (type: "edit" | "create" | "delete", product: Product | null = null) => {
    setModalType(type);
    setSelectedProduct(product);
    setIsModalOpen(true);

    if (type === "edit" && product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        stock: product.stock.toString(),
      });
    } else if (type === "create") {
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalType("");
  };

  const handleSaveChanges = async () => {
    try {
      if (modalType === "edit" && selectedProduct) {
        await updateProduct(selectedProduct.id, {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
        });
      } else if (modalType === "create") {
        const profile = await getProfile();
        await createProduct({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
          studentId: profile.id,
          status: true,
        });
      }
      handleCloseModal();
      const profile = await getProfile();
      const updatedProducts = await getProductsByStudentId();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (selectedProduct) {
        await deleteProduct(selectedProduct.id);
        handleCloseModal();
        const profile = await getProfile();
        const updatedProducts = await getProductsByStudentId();
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      await toggleProductStatus(product.id, !product.status);
  

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, status: !product.status } : p
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error);
    }
  };
  

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Mis Productos</h1>
        <div className="flex justify-end w-full mb-4">
          <button
            onClick={() => handleOpenModal("create")}
            className="bg-green-700 text-white p-2 rounded hover:opacity-80"
          >
            Publicar Producto
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <StudentProductCard
              key={product.id}
              product={product}
              onEdit={() => handleOpenModal("edit", product)}
              onDelete={() => handleOpenModal("delete", product)}
              onToggleStatus={() => handleToggleStatus(product)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 animate-slide-up">
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-1/3">
            {modalType === "edit" || modalType === "create" ? (
              <>
                <h2 className="text-xl text-white font-bold mb-4">
                  {modalType === "edit" ? "Editar Producto" : "Publicar Producto"}
                </h2>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
                />
                <textarea
                  placeholder="Descripción del producto"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
                ></textarea>
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full mb-4 p-2 bg-gray-600 text-white rounded"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleCloseModal}
                    className="bg-red-700 text-white p-2 rounded hover:opacity-80"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveChanges}
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
                    onClick={handleCloseModal}
                    className="bg-gray-600 text-white p-2 rounded hover:opacity-80"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="bg-red-700 text-white p-2 rounded hover:opacity-80"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
