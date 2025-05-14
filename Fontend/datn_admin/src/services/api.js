// Base URL for API calls
const API_BASE_URL = "http://localhost:8080/api";

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem("user"));
// const token = user.token;

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  console.log(`${API_BASE_URL}${endpoint}`)
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

// Account API
export const accountApi = {
  getAccounts: (page) =>
    fetchData(`/account/getByPage?page=${page}`, {
      method: "GET",
    }),
  getAccount: (id) => fetchData(`/accounts/${id}`),
  createAccount: (data) =>
    fetchData("/account/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        
      },
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
};

// User API
export const userApi = {
  getUsers: () => fetchData("/user/getAll",{
    method: "GET",
  }),
  getUsersWithNoAccount: () => fetchData("/user/getAllWithNoAccount",{
    method: "GET",
      headers: {
        
      },
  }),
  getUsersByPage: () => fetchData("/user/getByPage",{
    method: "GET",
      headers: {
        
      },
  }),
  getUser: (id) => fetchData(`/users/${id}`),
  createUser: (data) =>
    fetchData("/user/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        
      },
    }),
  updateUser: (id, data) =>
    fetchData(`/user/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        
      }
    }),
  deleteUser: (id) =>
    fetchData(`/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        
      }
    }),
};

// dashboard API
export const dashboardApi = {
  getStatistical: () => fetchData("/dashboard/statistical",{
    method: "GET",
  }),
}


// Mock data for dashboard statistics
export const getMockDashboardData = () => {
  return {
    monthlyRevenue: {
      "Tháng 1": 300000,
      "Tháng 2": 200000,
      "Tháng 3": 900000,
      "Tháng 4": 500000,
      "Tháng 5": 400000,
      "Tháng 6": 600000,
      "Tháng 7": 400000,
      "Tháng 8": 600000,
      "Tháng 9": 700000,
      "Tháng 10": 800000,
      "Tháng 11": 700000,
      "Tháng 12": 400000,
    },
    totalRevenueByYear: 600000.0,
    totalOrder: 3,
    totalRevenue: 600000.0,
    totalOrderIsPaid: 2,
    totalSubscriber: 6,
    users: [
      {
        id: 2,
        firstName: "Thái Quốc",
        lastName: "Khánh",
        sex: true,
        role: "Nhà thiết kế đồ họa",
      },
      {
        id: 4,
        firstName: "Admin",
        lastName: "Admin",
        sex: true,
        role: "Quản trị viên",
      },
      {
        id: 21,
        firstName: "abc",
        lastName: "Test",
        sex: false,
        role: "Nhà thiết kế Web",
      },
      {
        id: 22,
        firstName: "1",
        lastName: "Test",
        sex: false,
        role: "Marketing",
      },
      {
        id: 23,
        firstName: "2",
        lastName: "Test",
        sex: false,
        role: "Nhà thiết kế Front End",
      },
      {
        id: 24,
        firstName: "3",
        lastName: "Test",
        sex: false,
        role: "Quảng cáo bán hàng",
      },
    ],
  }
}
