// const API_URL = "http://localhost:3001"; // Asegúrate de que la URL sea correcta
const API_URL = 'https://api.umarketplace.cl';

export async function sendReport(reportData: { productId: number; reason: string; description: string }) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Usuario no autenticado.");
  }

  const response = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error("Error al enviar el reporte.");
  }

  return await response.json();
}
