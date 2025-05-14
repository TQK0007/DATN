"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import {
  orderApi,
  productApi,
  uploadImageProduct,
} from "../services/apiModuleManageProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [formData, setFormData] = useState({
    shippingAddress: "",
    paid: false,
    orderItems: [
      { quality: 1, image: "", size: "", color: "", price: 0, productId: "" },
    ],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrderAndPage, setTotalOrderAndPage] = useState({
    count: 1,
    page: 1,
  }); // Giả định có 1 trang
  const [triggerReload, setTriggerReload] = useState(false);
  const itemsPerPage = 5;
  const fileInputRefs = useRef([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [triggerReload]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderApi.getOrders(currentPage);
      setOrders(data);
      console.log(data)
    } catch (error) {
      console.error("Không thể tải dữ liệu đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await productApi.getProducts(currentPage);
      setProducts(data);
    } catch (error) {
      console.error("Không thể tải dữ liệu sản phẩm:", error);
    }
  };

  const handleAddOrder = () => {
    setFormData({
      shippingAddress: "",
      paid: false,
      orderItems: [
        { quality: 1, image: "", size: "", color: "", price: 0, productId: "" },
      ],
    });
    setShowModal(true);
  };

  const handleEditOrder = async (order) => {
    try {
      const orderDetail = await orderApi.getOrder(order.id);
      setCurrentOrder(orderDetail);
      setFormData({
        shippingAddress: orderDetail.shippingAddress,
        paid: orderDetail.paid,
        orderItems: orderDetail.orderItems || [
          {
            quality: 1,
            image: "",
            size: "",
            color: "",
            price: 0,
            productId: "",
          },
        ],
      });
      setShowModal(true);
    } catch (error) {
      console.error("Không thể tải chi tiết đơn hàng:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      try {
        await orderApi.deleteOrder(id);
        setOrders(orders.filter((order) => order.id !== id));
      } catch (error) {
        console.error("Không thể xóa đơn hàng:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOrderItemChange = (index, field, value) => {
    const updatedItems = [...formData.orderItems];

    if (field === "productId") {
      const selectedProduct = products.find((p) => p.id.toString() === value);
      if (selectedProduct) {
        updatedItems[index] = {
          ...updatedItems[index],
          productId: value,
          price: selectedProduct.price,
        };
      }
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]:
          field === "quality" || field === "price"
            ? Number.parseFloat(value)
            : value,
      };
    }

    setFormData({
      ...formData,
      orderItems: updatedItems,
    });
  };

  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageProduct(file);
        handleOrderItemChange(index, "image", imageUrl);
      } catch (error) {
        console.error("Không thể tải lên hình ảnh:", error);
      }
    }
  };

  const addOrderItem = () => {
    setFormData({
      ...formData,
      orderItems: [
        ...formData.orderItems,
        { quality: 1, image: "", size: "", color: "", price: 0, productId: "" },
      ],
    });
  };

  const removeOrderItem = (index) => {
    const updatedItems = [...formData.orderItems];
    updatedItems.splice(index, 1);
    setFormData({
      ...formData,
      orderItems: updatedItems,
    });
  };

  const calculateTotal = () => {
    return formData.orderItems.reduce((total, item) => {
      return total + item.price * item.quality;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOrder) {
        await orderApi.updateOrder(currentOrder.id, formData);
      } else {
        await orderApi.createOrder(formData);
      }
      setShowModal(false);
      setTriggerReload((prev) => !prev);
    } catch (error) {
      console.error("Không thể lưu đơn hàng:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTriggerReload((prev) => !prev);
  };

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = totalOrderAndPage.count;
  const totalPages = totalOrderAndPage.page;

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title">Quản lý đơn hàng</h5>
          <Button variant="primary" onClick={handleAddOrder}>
            Tạo đơn hàng
          </Button>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Tổng tiền</th>
                  <th>Địa chỉ giao hàng</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.totalPrice.toLocaleString()}đ</td>
                    <td>{order.shippingAddress}</td>
                    <td>
                      <Badge bg={order.paid ? "success" : "warning"}>
                        {order.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                      </Badge>
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon="edit"
                        className="action-icon edit-icon"
                        onClick={() => handleEditOrder(order)}
                      />
                      <FontAwesomeIcon
                        icon="trash-alt"
                        className="action-icon delete-icon"
                        onClick={() => handleDeleteOrder(order.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="pagination-info">
                Hiển thị {indexOfFirstItem + 1} đến{" "}
                {Math.min(indexOfLastItem, totalItems)} của {totalItems} kết quả
              </div>
              <div className="d-flex">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ms-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Tiếp
                </Button>
              </div>
            </div>
          </>
        )}
      </Card.Body>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo đơn hàng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ giao hàng</Form.Label>
              <Form.Control
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Đã thanh toán"
                name="paid"
                checked={formData.paid}
                onChange={handleInputChange}
              />
            </Form.Group>

            <h5 className="mt-4 mb-3">Sản phẩm đặt hàng</h5>

            <div
              className="order-items-container"
              style={{
                maxHeight: formData.orderItems.length > 2 ? "400px" : "auto",
                overflowY: "auto",
              }}
            >
              {formData.orderItems.map((item, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Sản phẩm #{index + 1}</h6>
                      {formData.orderItems.length > 1 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeOrderItem(index)}
                        >
                          Xóa
                        </Button>
                      )}
                    </div>

                    <Form.Group className="mb-3">
                      <Form.Label>Sản phẩm</Form.Label>
                      <Form.Select
                        value={item.productId}
                        onChange={(e) =>
                          handleOrderItemChange(
                            index,
                            "productId",
                            e.target.value
                          )
                        }
                        required
                      >
                        <option value="">Chọn sản phẩm</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {product.price.toLocaleString()}đ
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Kích thước</Form.Label>
                          <Form.Control
                            type="text"
                            value={item.size}
                            onChange={(e) =>
                              handleOrderItemChange(
                                index,
                                "size",
                                e.target.value
                              )
                            }
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Màu sắc</Form.Label>
                          <Form.Control
                            type="text"
                            value={item.color}
                            onChange={(e) =>
                              handleOrderItemChange(
                                index,
                                "color",
                                e.target.value
                              )
                            }
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Số lượng</Form.Label>
                          <Form.Control
                            type="number"
                            value={item.quality}
                            onChange={(e) =>
                              handleOrderItemChange(
                                index,
                                "quality",
                                e.target.value
                              )
                            }
                            min="1"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Hình ảnh</Form.Label>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(index, e)}
                          ref={(el) => (fileInputRefs.current[index] = el)}
                        />
                        {item.image && (
                          <div className="ms-2">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt="Preview"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Group className="mb-0">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control
                          type="number"
                          value={item.price}
                          readOnly
                          className="bg-light"
                        />
                      </Form.Group>
                      <div className="fw-bold">
                        Tổng: {(item.price * item.quality).toLocaleString()}đ
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Button
              variant="outline-primary"
              className="mb-4"
              onClick={addOrderItem}
            >
              Thêm sản phẩm
            </Button>

            <div className="bg-light p-3 rounded mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Tổng đơn hàng:</h5>
                <h5 className="mb-0">{calculateTotal().toLocaleString()}đ</h5>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                Tạo đơn hàng
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default OrderManagement;
