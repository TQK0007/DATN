"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faTimes, faSave } from "@fortawesome/free-solid-svg-icons"
import { orderApi } from "../services/api"

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [shippingAddress, setShippingAddress] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Format giá tiền theo định dạng VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await orderApi.getOrderDetail(id)
        setOrder(data)
        setShippingAddress(data.shippingAddress)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching order details:", err)
        setError("Có lỗi xảy ra khi tải thông tin đơn hàng. Vui lòng thử lại sau.")
        setIsLoading(false)
      }
    }

    fetchOrderDetail()
  }, [id])

  // Handle update shipping address
  const handleUpdateOrder = async (e) => {
    e.preventDefault()

    if (!shippingAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ giao hàng")
      return
    }

    try {
      setIsSubmitting(true)

      // Chuẩn bị dữ liệu cập nhật
      const updateData = {
        shippingAddress,
        paid: order.paid,
        orderItems: order.orderItems.map((item) => ({
          id: item.id,
          quality: item.quality,
          image: item.image,
          size: item.size,
          price: item.price,
          color: item.color,
          productId: item.productId,
        })),
      }

      console.log(updateData)
      await orderApi.updateOrder(id, updateData)

      // Cập nhật state
      setOrder({
        ...order,
        shippingAddress,
      })

      toast.success("Cập nhật địa chỉ giao hàng thành công")
    } catch (err) {
      console.error("Error updating order:", err)
      toast.error("Có lỗi xảy ra khi cập nhật đơn hàng. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle delete order
  const handleDeleteOrder = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      return
    }

    try {
      await orderApi.deleteOrder(id)
      toast.success("Đơn hàng đã được hủy thành công")
      navigate("/pending-orders")
    } catch (err) {
      console.error("Error deleting order:", err)
      toast.error("Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại sau.")
    }
  }

  // Calculate total price
  const calculateTotal = () => {
    if (!order || !order.orderItems) return 0
    return order.orderItems.reduce((total, item) => total + item.price * item.quality, 0)
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

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Không tìm thấy thông tin đơn hàng</div>
      </div>
    )
  }

  return (
    <div className="order-detail-page py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Chi tiết đơn hàng #{order.id}</h1>
          <Link to={order.paid ? "/orders" : "/pending-orders"} className="btn btn-outline-primary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Quay lại danh sách đơn hàng
          </Link>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {/* Order Items */}
            <div className="card mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Sản phẩm đã đặt</h5>
              </div>
              <div className="card-body">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="row mb-3 pb-3 border-bottom">
                    <div className="col-auto">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.productName}
                        className="img-thumbnail"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col">
                      <h5 className="mb-1">{item.productName}</h5>
                      <p className="mb-1 text-muted">
                        Kích thước: {item.size}, Màu: {item.color}
                      </p>
                      <p className="mb-0">
                        {formatPrice(item.price)} x {item.quality} = {formatPrice(item.price * item.quality)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Order Summary */}
            <div className="card mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Tóm tắt đơn hàng</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Mã đơn hàng:</span>
                  <span>#{order.id}</span>
                </div>
                {order.createdAt && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Ngày đặt hàng:</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Trạng thái thanh toán:</span>
                  <span className={`badge ${order.paid ? "bg-success" : "bg-warning"}`}>
                    {order.paid ? "Đã thanh toán" : "Chờ thanh toán"}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Tổng cộng:</strong>
                  <strong>{formatPrice(calculateTotal())}</strong>
                </div>

                {!order.paid && (
                  <button className="btn btn-danger w-100 mb-3" onClick={handleDeleteOrder}>
                    <FontAwesomeIcon icon={faTimes} className="me-2" />
                    Hủy đơn hàng
                  </button>
                )}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="card">
              <div className="card-header bg-white">
                <h5 className="mb-0">Thông tin giao hàng</h5>
              </div>
              <div className="card-body">
                {order.paid ? (
                  // Nếu đã thanh toán, chỉ hiển thị địa chỉ
                  <p>{order.shippingAddress}</p>
                ) : (
                  // Nếu chưa thanh toán, cho phép cập nhật địa chỉ
                  <form onSubmit={handleUpdateOrder}>
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
                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Đang cập nhật...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSave} className="me-2" />
                          Cập nhật địa chỉ
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
