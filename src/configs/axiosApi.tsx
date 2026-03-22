import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Interceptor de resposta
axiosApi.interceptors.response.use(
  (response) => {
    // sucesso → retorna só os dados
    return response.data;
  },
  (error) => {
    // erro → trata globalmente

    if (error.response) {
      const apiError = error.response.data;

      return Promise.reject({
        status: error.response.status,
        message: apiError?.detail?.message || apiError?.detail || "Erro na API",
        raw: apiError,
      });
    }

    return Promise.reject({
      status: 500,
      message: "Erro de conexão com o servidor",
    });
  }
);

export default axiosApi;