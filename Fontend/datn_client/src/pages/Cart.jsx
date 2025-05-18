import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faArrowLeft, faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import { cartApi, orderApi } from "../services/api"
import {authService} from "../services/apiModuleUser"

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [shippingAddress, setShippingAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Format giá tiền theo định dạng VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Load cart items
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const cartId = authService.getCartId()
        if (!cartId) {
          setCartItems([])
          setIsLoading(false)
          return
        }

        const cartData = await cartApi.getCartDetail(cartId)
        if (cartData && cartData.cartItems) {
          setCartItems(cartData.cartItems)
        } else {
          setCartItems([])
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error loading cart:", err)
        setError("Có lỗi xảy ra khi tải giỏ hàng. Vui lòng thử lại sau.")
        setIsLoading(false)
      }
    }

    loadCartItems()

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartItems()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  console.log(cartItems)

  // Handle quantity change
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      await cartApi.updateCartItem(cartItemId, { quality: newQuantity })

      // Update local state
      setCartItems(cartItems.map((item) => (item.id === cartItemId ? { ...item, quality: newQuantity } : item)))

      // Trigger cart update event
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (error) {
      console.error("Error updating cart item:", error)
      toast.error("Có lỗi xảy ra khi cập nhật số lượng. Vui lòng thử lại.")
    }
  }

  // Handle remove item
  const handleRemoveItem = async (cartItemId) => {
    try {
      await cartApi.deleteCartItem(cartItemId)

      // Update local state
      setCartItems(cartItems.filter((item) => item.id !== cartItemId))
      setSelectedItems(selectedItems.filter((id) => id !== cartItemId))

      // Trigger cart update event
      window.dispatchEvent(new Event("cartUpdated"))

      toast.success("Đã xóa sản phẩm khỏi giỏ hàng")
    } catch (error) {
      console.error("Error removing cart item:", error)
      toast.error("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.")
    }
  }

  // Handle item selection
  const handleSelectItem = (cartItemId) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId) ? prev.filter((id) => id !== cartItemId) : [...prev, cartItemId],
    )
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.id))
    }
  }

  // Calculate total price
  const calculateTotal = () => {
    return selectedItems.reduce((total, cartItemId) => {
      const item = cartItems.find((item) => item.id === cartItemId)
      return item ? total + item.price * item.quality : total
    }, 0)
  }

  // Handle checkout
  const handleCheckout = async (e) => {
    e.preventDefault()

    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm")
      return
    }

    if (!shippingAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ giao hàng")
      return
    }

    try {
      setIsSubmitting(true)

      // Create order items from selected cart items
      const orderItems = selectedItems.map((cartItemId) => {
        const item = cartItems.find((item) => item.id === cartItemId)
        return {
          quality: item.quality,
          image: item.image,
          size: item.size,
          color: item.color,
          price: item.price,
          productId: item.productId,
        }
      })

      // Create order
      const orderData = {
        shippingAddress,
        paid: false, // Đơn hàng chưa thanh toán
        orderItems,
      }


      await orderApi.createOrder(orderData)

      // Remove purchased items from cart
      for (const cartItemId of selectedItems) {
        await cartApi.deleteCartItem(cartItemId)
      }

      // Update local state
      setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)))
      setSelectedItems([])

      // Trigger cart update event
      window.dispatchEvent(new Event("cartUpdated"))

      toast.success("Mua hàng thành công!")
      navigate("/pending-orders")
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("Có lỗi xảy ra khi Mua hàng. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="cart-page py-5">
      <div className="container">
        <h1 className="mb-4">Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <FontAwesomeIcon icon={faShoppingBag} size="4x" className="text-muted" />
            </div>
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p className="text-muted mb-4">Hãy thêm sản phẩm vào giỏ h��ng để tiếp tục mua sắm</p>
            <Link to="/products" className="btn btn-primary">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-header bg-white">
                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="selectAll"
                        checked={selectedItems.length === cartItems.length}
                        onChange={handleSelectAll}
                      />
                      <label className="form-check-label" htmlFor="selectAll">
                        Chọn tất cả ({cartItems.length} sản phẩm)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {cartItems.map((item) => (
                    <div key={item.id} className="row mb-3 pb-3 border-bottom">
                      <div className="col-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`item-${item.id}`}
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </div>
                      </div>
                      <div className="col-auto">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="img-thumbnail"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col">
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="mb-1 text-muted">
                          Kích thước: {item.size}, Màu: {item.color}
                        </p>
                        <p className="mb-0 fw-bold">{formatPrice(item.price)}</p>
                      </div>
                      <div className="col-auto">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(item.id, item.quality - 1)}
                            disabled={item.quality <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control form-control-sm mx-2"
                            style={{ width: "50px" }}
                            value={item.quality}
                            onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                            min="1"
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(item.id, item.quality + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveItem(item.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <Link to="/products" className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Tóm tắt đơn hàng</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span>Tạm tính ({selectedItems.length} sản phẩm):</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Phí vận chuyển:</span>
                    <span>Miễn phí</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <strong>Tổng cộng:</strong>
                    <strong>{formatPrice(calculateTotal())}</strong>
                  </div>

                  <form onSubmit={handleCheckout}>
                    <div className="mb-3">
                      <label htmlFor="shippingAddress" className="form-label">
                        Địa chỉ giao hàng:
                      </label>
                      <textarea
                        className="form-control"
                        id="shippingAddress"
                        rows="3"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={selectedItems.length === 0 || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Đang xử lý...
                        </>
                      ) : (
                        "Mua hàng"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
