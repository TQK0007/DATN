"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faShoppingBag, faClock } from "@fortawesome/free-solid-svg-icons"
import { orderApi} from "../services/api"
import { authService } from "../services/apiModuleUser"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Format giá tiền theo định dạng VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Format date
  // const formatDate = (dateString) => {
  //   const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
  //   return new Date(dateString).toLocaleDateString("vi-VN", options)
  // }

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const user = authService.getCurrentUser()
        if (!user || !user.userId) {
          setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.")
          setIsLoading(false)
          return
        }

        const data = await orderApi.getUserOrders(user.userId)
        // Lọc chỉ lấy các đơn hàng đã thanh toán (paid: true)
        const paidOrders = data.filter((order) => order.paid === true)
        setOrders(paidOrders)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching orders:", err)
        setError("Có lỗi xảy ra khi tải danh sách đơn hàng. Vui lòng thử lại sau.")
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Chờ xác nhận":
        return "bg-warning"
      case "Đã xác nhận":
        return "bg-info"
      case "Đang giao hàng":
        return "bg-primary"
      case "Đã giao hàng":
        return "bg-success"
      case "Đã hủy":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  return (
    <div className="orders-page py-5">
      <div className="container">
        <h1 className="mb-4">Đơn hàng đã thanh toán</h1>

        <div className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to="/orders" className="nav-link active">
                <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
                Đã thanh toán
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pending-orders" className="nav-link">
                <FontAwesomeIcon icon={faClock} className="me-2" />
                Chờ thanh toán
              </Link>
            </li>
          </ul>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Đang tải...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <FontAwesomeIcon icon={faShoppingBag} size="4x" className="text-muted" />
            </div>
            <h3>Bạn chưa có đơn hàng đã thanh toán nào</h3>
            <p className="text-muted mb-4">Hãy mua sắm và thanh toán để xem lịch sử đơn hàng tại đây</p>
            <Link to="/products" className="btn btn-primary">
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tổng tiền</th>
                      <th>Địa chỉ giao hàng</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{formatPrice(order.totalPrice)}</td>
                        <td>{order.shippingAddress}</td>
                        <td>
                          <span className="badge bg-success">Đã thanh toán</span>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link
                              to={`/order/${order.id}`}
                              className="btn btn-sm btn-outline-primary"
                              title="Xem chi tiết"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
