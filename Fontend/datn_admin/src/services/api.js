// Base URL for API calls
const API_BASE_URL = "http://localhost:8080/api";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const token = user.token;

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
  console.log(`${API_BASE_URL}${endpoint}`)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // Nếu không phải JSON, trả về text hoặc null tùy theo mục đích sử dụng
      return await response.text(); // hoặc: return null;
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Account API
export const accountApi = {
  getAccounts: (page) =>
    fetchData(`/account/getByPage?page=${page}`, {
      method: "GET",
      headers: {
        "Authorization": token,
      },
    }),
  getAccount: (id) => fetchData(`/accounts/${id}`),
  createAccount: (data) =>
    fetchData("/account/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization": token,
      },
    }),
  updateAccount: (id, data) =>
    fetchData(`/account/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Authorization": token,
      },
    }),
  deleteAccount: (id) =>
    fetchData(`/account/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    }),
  getTotalPages: () => 
    fetchData(`/account/totalPage`, {
      method: "GET",
      headers: {
        "Authorization": token,
      },
    }),
};

// User API
export const userApi = {
  getUsers: () => fetchData("/user/getAll",{
    method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
  getUsersWithNoAccount: () => fetchData("/user/getAllWithNoAccount",{
    method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
  getUsersByPage: () => fetchData("/user/getByPage",{
    method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
  getUser: (id) => fetchData(`/users/${id}`),
  createUser: (data) =>
    fetchData("/user/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization": token,
      },
    }),
  updateUser: (id, data) =>
    fetchData(`/user/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Authorization": token,
      }
    }),
  deleteUser: (id) =>
    fetchData(`/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      }
    }),
};


