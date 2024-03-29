import axios from "axios";

const baseUrl = "http://localhost:8000";

const apiUnauthenticated = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === `${baseUrl}/refresh/`
    ) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid" &&
      error.response.data.detail === "Token is invalid or expired"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await apiClient.post("/refresh/", {
            refresh: refreshToken,
          });
          localStorage.setItem("accessToken", response.data.access);
          return apiClient(originalRequest);
        } catch (error) {
          console.log(error);
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } else {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient, apiUnauthenticated };
