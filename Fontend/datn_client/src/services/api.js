// Base URL for API calls
const API_BASE_URL = "http://localhost:8081/api";

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Danh sách các endpoint KHÔNG cần token
  const noAuthEndpoints = [
    "/product/getByPage",
    "/product/detail",
    "/product/related",
    "/product/getProductByName",
    "/product/getByFiltersAndSort",
    "/feedback/product",
  ];

  // Kiểm tra xem endpoint hiện tại có nằm trong danh sách miễn xác thực không
  const shouldSkipAuth = noAuthEndpoints.some((openEndpoint) =>
    endpoint.startsWith(openEndpoint)
  );

  // console.log(`${API_BASE_URL}${endpoint}`);
  // console.log("Token:", shouldSkipAuth ? "SKIPPED" : token);

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

// Product API
export const productApi = {
    getProducts: (page, filters = {}) => {
    const queryParams = new URLSearchParams()
    queryParams.append("page", page)

    // Add filter parameters if they exist
    if (filters.gender) queryParams.append("gender", filters.gender)
    if (filters.collection) queryParams.append("collection", filters.collection)
    if (filters.minPrice) queryParams.append("minPrice", filters.minPrice)
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice)
    if (filters.search) queryParams.append("search", filters.search)
    if (filters.sortType) queryParams.append("sortType", filters.sortType)

    return fetchData(`/product/getByFiltersAndSort?${queryParams.toString()}`, {
      method: "GET",
    })
  },
  getProductDetail: (id) =>
    fetchData(`/product/detail/${id}`, {
      method: "GET",
    }),
  getRelatedProducts: (categoryId) =>
    fetchData(`/product/related/${categoryId}`, {
      method: "GET",
    }),
};

// FeedBack API
export const commentApi = {
  getComments: (productId) =>
    fetchData(`/feedback/product/${productId}`, {
      method: "GET",
    }),
  createComment: (data) =>
    fetchData(`/feedback/create`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Order API
export const orderApi = {
  createOrder: (data) =>
    fetchData(`/order/create`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getUserOrders: (userId) =>
    fetchData(`/order/user-orders/${userId}`, {
      method: "GET",
    }),
  getOrderDetail: (orderId) =>
    fetchData(`/order/detail/${orderId}`, {
      method: "GET",
    }),
  updateOrder: (orderId, data) =>
    fetchData(`/order/update/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteOrder: (orderId) =>
    fetchData(`/order/delete/${orderId}`, {
      method: "DELETE",
    }),
  cancelOrder: (orderId) =>
    fetchData(`/order/cancel/${orderId}`, {
      method: "PUT",
    }),
};

// Cart functionality using localStorage
export const cartService = {
  getCart: () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  },
  addToCart: (item) => {
    const cart = cartService.getCart();

    // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );

    if (existingItemIndex >= 0) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      cart[existingItemIndex].quality += item.quality;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Dispatch event để cập nhật UI
    window.dispatchEvent(new Event("cartUpdated"));
    return cart;
  },
  updateCartItem: (index, newItem) => {
    const cart = cartService.getCart();
    if (index >= 0 && index < cart.length) {
      cart[index] = newItem;
      localStorage.setItem("cart", JSON.stringify(cart));
      // Dispatch event để cập nhật UI
      window.dispatchEvent(new Event("cartUpdated"));
    }
    return cart;
  },
  removeCartItem: (index) => {
    const cart = cartService.getCart();
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      // Dispatch event để cập nhật UI
      window.dispatchEvent(new Event("cartUpdated"));
    }
    return cart;
  },
  clearCart: () => {
    localStorage.removeItem("cart");
    // Dispatch event để cập nhật UI
    window.dispatchEvent(new Event("cartUpdated"));
    return [];
  },
};

// Cart API
export const cartApi = {
  getCartByUserId: (userId) =>
    fetchData(`/cart/getByUserId/${userId}`, {
      method: "GET",
    }),
  getCartDetail: (cartId) =>
    fetchData(`/cart/getDetail/${cartId}`, {
      method: "GET",
    }),
  updateCartItem: (cartItemId, data) =>
    fetchData(`/cartitem/update/${cartItemId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  createCartItem: (data) =>
    fetchData(`/cartitem/create`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteCartItem: (cartItemId) =>
    fetchData(`/cartitem/delete/${cartItemId}`, {
      method: "DELETE",
    }),
};

export default {
  productApi,
  commentApi,
  orderApi,
  cartService,
  cartApi,
};
