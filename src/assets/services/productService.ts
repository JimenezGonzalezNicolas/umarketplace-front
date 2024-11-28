import axios from "axios";
import { Product } from "../interfaces/product";

// Configuración base de la API
// const API_BASE_URL = "http://localhost:3001";

const API_BASE_URL = 'https://api.umarketplace.cl';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Añadir token automáticamente
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token"); // Usamos el token del sessionStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getProductsByCampus = async (campus: string) => {
    try {
        const response = await api.get(`/products/campus/${campus}`);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener productos por campus:", error.response?.data || error.message);
        throw error;
    }
};

export const createProduct = async (productData: any): Promise<any> => {
    try {
        const studentId = sessionStorage.getItem("studentId");
        const response = await api.post(`/products`, { ...productData, studentId });
        return response.data;
    } catch (error: any) {
        console.error("Error al crear producto:", error.response?.data || error.message);
        throw error;
    }
};


export const updateProduct = async (id: number, productData: any) => {
    try {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    } catch (error: any) {
        console.error("Error al actualizar producto:", error.response?.data || error.message);
        throw error;
    }
};

export const activateProduct = async (id: number) => {
    try {
        await api.patch(`/products/${id}/activate`);
    } catch (error: any) {
        console.error("Error al activar producto:", error.response?.data || error.message);
        throw error;
    }
};

export const deactivateProduct = async (id: number) => {
    try {
        await api.patch(`/products/${id}/deactivate`);
    } catch (error: any) {
        console.error("Error al desactivar producto:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteProduct = async (id: number) => {
    try {
        await api.delete(`/products/${id}`);
    } catch (error: any) {
        console.error("Error al eliminar producto:", error.response?.data || error.message);
        throw error;
    }
};

export const getProductsByStudentId = async (): Promise<Product[]> => {
    try {
        const studentId = sessionStorage.getItem("studentId");
        const response = await api.get(`/products/student/${studentId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener productos del estudiante:", error.response?.data || error.message);
        throw error;
    }
};



export const toggleProductStatus = async (productId: number, status: boolean) => {
    const response = await api.patch(`/products/${productId}/${status ? "activate" : "deactivate"}`);
    return response.data;
};


export default {
    getProductsByCampus,
    createProduct,
    updateProduct,
    activateProduct,
    deactivateProduct,
    deleteProduct,
    getProductsByStudentId,
    toggleProductStatus
};
