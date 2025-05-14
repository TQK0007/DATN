// Base URL for API calls
const API_BASE_URL = "http://localhost:8081/api";

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem("user"));
// const token = user.token;

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  console.log(token)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
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

  getCategories: () => fetchData(`/category/getAll`,{
      method: "GET",
      headers: {
        
      },
  }),
  getCategoryBypage: (page) => fetchData(`/category/getByPage?page=${page}`,{
      method: "GET",
      headers: {
        
      },
  }),
   getTotalCategoryAndPage: () => fetchData(`/category/getTotalCategoryAndPage`,{
      method: "GET",
      headers: {
        
      },
  }),
  getCategory: (id) => fetchData(`/categories/${id}`),
  createCategory: (data) =>
    fetchData("/category/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        
      },
    }),
  updateCategory: (id, data) =>
    fetchData(`/category/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        
      },
    }),
  deleteCategory: (id) =>
    fetchData(`/category/delete/${id}`, {
      method: "DELETE",
      headers: {
        
      },
    }),
};

// Product API
export const productApi = {
  getProducts: (page) => fetchData(`/product/getByPage?page=${page}`,{
      method: "GET",
      headers: {
        
      },
  }),
  getProduct: (id) => fetchData(`/product/detail/${id}`,{
      method: "GET",
      headers: {
        
      },
  }),
  createProduct: (data) =>
    fetchData("/product/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        
      },
    }),
  updateProduct: (id, data) =>
    fetchData(`/product/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        
      },
    }),
  deleteProduct: (id) =>
    fetchData(`/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        
      },
    }),
};

// Material API
export const materialApi = {
  getMaterials: (page) => fetchData(`/material/getByPage?page=${page}`,{
      method: "GET",
      headers: {
        
      },
  }),
   getTotalMaterialAndPage: () => fetchData(`/material/getTotalMaterialAndPage`,{
      method: "GET",
      headers: {
        
      },
  }),
  getMaterial: (id) => fetchData(`/materials/${id}`),
  createMaterial: (data) =>
    fetchData("/material/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        
      },
    }),
  updateMaterial: (id, data) =>
    fetchData(`/material/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        
      },
    }),
  deleteMaterial: (id) =>
    fetchData(`/material/delete/${id}`, {
      method: "DELETE",
      headers: {
        
      },
    }),
  
};

// Order API
export const orderApi = {
  getOrders: (page) => fetchData(`/order/getByPage?page=${page}`,{
      method: "GET",
      headers: {
        
      },
  }),
  getOrder: (id) => fetchData(`/orders/${id}`),
  createOrder: (data) =>
    fetchData("/order/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateOrder: (id, data) =>
    fetchData(`/order/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteOrder: (id) =>
    fetchData(`/order/delete/${id}`, {
      method: "DELETE",
    }),
};

export const uploadImageMaterial = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // "file" là tên tham số đúng theo API backend
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  try {
    const response = await fetch("http://localhost:8081/api/material/uploadImg", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    if (!response.ok) {
      throw new Error("Upload ảnh thất bại");
    }

    const imageUrl = await response.text(); // Vì server trả về kiểu String
    return imageUrl; // vd: "http://localhost:8081/Img/xxx.jpg"
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw error;
  }
};

export const uploadImageProduct = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // "file" là tên tham số đúng theo API backend
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  try {
    const response = await fetch("http://localhost:8081/api/product/uploadImg", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    if (!response.ok) {
      throw new Error("Upload ảnh thất bại");
    }

    const imageUrl = await response.text(); // Vì server trả về kiểu String
    return imageUrl; // vd: "http://localhost:8081/Img/xxx.jpg"
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw error;
  }
};

// dashboard API
export const dashboardApiModuleProudct = {
  getStatistical: () => fetchData("/dashboard/statistical",{
    method: "GET",
  }),
}