import { cartApi } from "./api";

// Base URL for API calls
const API_BASE_URL = "http://localhost:8080/api";

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Danh sách các endpoint KHÔNG cần token
  const noAuthEndpoints = [
    "/account/login",
    "/account/register"
  ];

  // Kiểm tra xem endpoint hiện tại có nằm trong danh sách miễn xác thực không
  const shouldSkipAuth = noAuthEndpoints.some((openEndpoint) =>
    endpoint.startsWith(openEndpoint)
  );
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(shouldSkipAuth ? {} : { Authorization: token }),
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Account API
export const accountApi = {
  login: (data) =>
    fetchData("/account/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  register: (data) =>
    fetchData("/account/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {},
    }),
  getAccounts: (page) =>
    fetchData(`/account/getByPage?page=${page}`, {
      method: "GET",
    }),
  getAccount: (id) => fetchData(`/accounts/${id}`),
  createAccount: (data) =>
    fetchData("/account/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {},
    }),
  updateAccount: (id, data) =>
    fetchData(`/account/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteAccount: (id) =>
    fetchData(`/account/delete/${id}`, {
      method: "DELETE",
    }),
  getTotalPages: () =>
    fetchData(`/account/totalPage`, {
      method: "GET",
    }),
  forgotPassword: (email) =>
    fetchData(`/account/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  resetPassword: (data) =>
    fetchData(`/account/reset-password`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Auth Service
export const authService = {
  login: async (token) => {
    // Giải mã payload từ JWT (tùy chọn, hoặc bạn có thể giữ nguyên token)
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    const user = {
      userId: decodedPayload.userId,
      username: decodedPayload.username,
      token: token, // bạn nên lưu token để sử dụng sau này
    };

    localStorage.setItem("user", JSON.stringify(user));
    try {
      // Lấy cartId sau khi đăng nhập
      const cartResponse = await cartApi.getCartByUserId(user.userId)
      if (cartResponse && cartResponse.cartId) {
        localStorage.setItem("cartId", cartResponse.cartId)
      }
    } catch (error) {
      console.error("Error fetching cart ID:", error)
    }

    
    // Dispatch event để cập nhật UI
    window.dispatchEvent(new Event("storage"))
    window.dispatchEvent(new Event("cartUpdated"))
  },
  logout: () => {
    localStorage.removeItem("user")
    localStorage.removeItem("cartId")
    // Dispatch event để cập nhật UI
    window.dispatchEvent(new Event("storage"))
    window.dispatchEvent(new Event("cartUpdated"))
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
  isAuthenticated: () => {
    const user = authService.getCurrentUser();
    return !!user;
  },
   getCartId: () => {
    return localStorage.getItem("cartId")
  },
};

