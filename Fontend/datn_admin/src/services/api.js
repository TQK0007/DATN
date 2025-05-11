// Base URL for API calls
const API_BASE_URL = "https://api.example.com"

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Account API
export const accountApi = {
  getAccounts: () => fetchData("/accounts"),
  getAccount: (id) => fetchData(`/accounts/${id}`),
  createAccount: (data) =>
    fetchData("/accounts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateAccount: (id, data) =>
    fetchData(`/accounts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteAccount: (id) =>
    fetchData(`/accounts/${id}`, {
      method: "DELETE",
    }),
}

// User API
export const userApi = {
  getUsers: () => fetchData("/users"),
  getUser: (id) => fetchData(`/users/${id}`),
  createUser: (data) =>
    fetchData("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateUser: (id, data) =>
    fetchData(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteUser: (id) =>
    fetchData(`/users/${id}`, {
      method: "DELETE",
    }),
}

// Category API
export const categoryApi = {
  getCategories: () => fetchData("/categories"),
  getCategory: (id) => fetchData(`/categories/${id}`),
  createCategory: (data) =>
    fetchData("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCategory: (id, data) =>
    fetchData(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCategory: (id) =>
    fetchData(`/categories/${id}`, {
      method: "DELETE",
    }),
}

// Product API
export const productApi = {
  getProducts: () => fetchData("/products"),
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
}

// Material API
export const materialApi = {
  getMaterials: () => fetchData("/materials"),
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
}

// Order API
export const orderApi = {
  getOrders: () => fetchData("/orders"),
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
}

// Upload image
export const uploadImage = async (file) => {
  // This is a mock function - in a real app, you would upload to a server
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a URL returned from server
      resolve(`https://example.com/images/${file.name}`)
    }, 500)
  })
}
