import React from "react";

interface StudentProductCardProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        status: boolean;
    };
    onEdit: () => void;
    onDelete: () => void;
    onToggleStatus: () => void;
}

const StudentProductCard: React.FC<StudentProductCardProps> = ({
    product,
    onEdit,
    onDelete,
    onToggleStatus,
}) => {
    return (
        <div className="bg-gray-700 rounded-lg shadow-lg p-4 animate-slide-up">
            <h2 className="text-xl text-white font-bold">{product.name}</h2>
            <p className="text-white">{product.description}</p>
            <p className="text-white font-bold">${product.price}</p>
            <p className={`text-sm ${product.status ? "text-green-500" : "text-red-500"}`}>
                {product.status ? "Activo" : "Inactivo"}
            </p>
            <p className="text-white">Stock: {product.stock}</p>
            <div className="flex flex-col gap-1 justify-between mt-4">
                <button
                    onClick={onToggleStatus}
                    className="bg-green-700 text-white p-2 rounded hover:opacity-80"
                >
                    {product.status ? "Desactivar" : "Activar"}
                </button>
                <button
                    onClick={onEdit}
                    className="bg-gray-600 text-white p-2 rounded hover:opacity-80"
                >
                    Editar
                </button>
                <button
                    onClick={onDelete}
                    className="bg-gray-600 text-white p-2 rounded hover:opacity-80"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default StudentProductCard;
