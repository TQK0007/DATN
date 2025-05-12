// Base URL for API calls
const API_BASE_URL = "http://localhost:8081/api";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const token = user.token;

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
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

// Category API
export const categoryApi = {
  getCategories: (page) => fetchData(`/category/getByPage?page=${page}`,{
      method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
   getTotalCategoryAndPage: () => fetchData(`/category/getTotalCategoryAndPage`,{
      method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
  getCategory: (id) => fetchData(`/categories/${id}`),
  createCategory: (data) =>
    fetchData("/category/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization": token,
      },
    }),
  updateCategory: (id, data) =>
    fetchData(`/category/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Authorization": token,
      },
    }),
  deleteCategory: (id) =>
    fetchData(`/category/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    }),
};

// Product API
export const productApi = {
  getProducts: () => fetchData("/product/getByPage",{
      method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
  getProduct: (id) => fetchData(`/products/${id}`),
  createProduct: (data) =>
    fetchData("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateProduct: (id, data) =>
    fetchData(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteProduct: (id) =>
    fetchData(`/products/${id}`, {
      method: "DELETE",
    }),
};

// Material API
export const materialApi = {
  getMaterials: () => fetchData("/material/getByPage",{
      method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
  getMaterial: (id) => fetchData(`/materials/${id}`),
  createMaterial: (data) =>
    fetchData("/materials", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateMaterial: (id, data) =>
    fetchData(`/materials/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteMaterial: (id) =>
    fetchData(`/materials/${id}`, {
      method: "DELETE",
    }),
};

// Order API
export const orderApi = {
  getOrders: () => fetchData("/order/getByPage",{
      method: "GET",
      headers: {
        "Authorization": token,
      },
  }),
  getOrder: (id) => fetchData(`/orders/${id}`),
  createOrder: (data) =>
    fetchData("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateOrder: (id, data) =>
    fetchData(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteOrder: (id) =>
    fetchData(`/orders/${id}`, {
      method: "DELETE",
    }),
};

// Upload image
export const uploadImage = async (file) => {
  // This is a mock function - in a real app, you would upload to a server
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a URL returned from server
      resolve(`https://example.com/images/${file.name}`);
    }, 500);
  });
};