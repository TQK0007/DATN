"use client"

import { useState, useEffect, useRef } from "react"
import { Card, Button, Table, Modal, Form, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { productApi, categoryApi, uploadImage } from "../services/apiModuleManageProduct"

const ProductManagement = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    discount: 0,
    description: "",
    categoryId: 1,
    productAttributes: [{ image: "", size: "", color: "", quality: 0 }],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProductAndPage, setTotalProductAndPage] = useState({
    count: 1,
    page: 1,
  }); // Giả định có 1 trang
  const [triggerReload, setTriggerReload] = useState(false);
  const itemsPerPage = 5
  const fileInputRefs = useRef([])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [triggerReload])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productApi.getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Không thể tải dữ liệu sản phẩm:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getCategories()
      setCategories(data)
    } catch (error) {
      console.error("Không thể tải dữ liệu danh mục:", error)
    }
  }

  const handleAddProduct = () => {
    setCurrentProduct(null)
    setFormData({
      name: "",
      price: 0,
      discount: 0,
      description: "",
      categoryId: 1,
      productAttributes: [{ image: "", size: "", color: "", quality: 0 }],
    })
    setShowModal(true)
  }

  const handleEditProduct = async (product) => {
    try {
      const productDetail = await productApi.getProduct(product.id)
      setCurrentProduct(productDetail)
      setFormData({
        name: productDetail.name,
        price: productDetail.price,
        discount: productDetail.discount,
        description: productDetail.description,
        categoryId: productDetail.categoryId,
        productAttributes: productDetail.productAttributes || [{ image: "", size: "", color: "", quality: 0 }],
      })
      setShowModal(true)
    } catch (error) {
      console.error("Không thể tải chi tiết sản phẩm:", error)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        await productApi.deleteProduct(id)
        setProducts(products.filter((product) => product.id !== id))
      } catch (error) {
        console.error("Không thể xóa sản phẩm:", error)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    })
  }

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...formData.productAttributes]
    updatedAttributes[index] = {
      ...updatedAttributes[index],
      [field]: field === "quality" ? Number.parseInt(value) : value,
    }
    setFormData({
      ...formData,
      productAttributes: updatedAttributes,
    })
  }

  const handleFileChange = async (index, e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const imageUrl = await uploadImage(file)
        handleAttributeChange(index, "image", imageUrl)
      } catch (error) {
        console.error("Không thể tải lên hình ảnh:", error)
      }
    }
  }

  const addAttribute = () => {
    setFormData({
      ...formData,
      productAttributes: [...formData.productAttributes, { image: "", size: "", color: "", quality: 0 }],
    })
  }

  const removeAttribute = (index) => {
    const updatedAttributes = [...formData.productAttributes]
    updatedAttributes.splice(index, 1)
    setFormData({
      ...formData,
      productAttributes: updatedAttributes,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentProduct) {
        await productApi.updateProduct(currentProduct.id, formData)
        setProducts(
          products.map((product) => (product.id === currentProduct.id ? { ...product, ...formData } : product)),
        )
      } else {
        const newProduct = await productApi.createProduct(formData)
        setProducts([...products, newProduct])
      }
      setShowModal(false)
    } catch (error) {
      console.error("Không thể lưu sản phẩm:", error)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  //const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = totalProductAndPage.count
  const totalPages = totalProductAndPage.page
  

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title">Quản lý sản phẩm</h5>
          <Button variant="primary" onClick={handleAddProduct}>
            Thêm sản phẩm
          </Button>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Giảm giá</th>
                  <th>Danh mục</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString()}đ</td>
                    <td>{product.discount}%</td>
                    <td>{product.categoryName}</td>
                    <td>
                      <FontAwesomeIcon
                        icon="edit"
                        className="action-icon edit-icon"
                        onClick={() => handleEditProduct(product)}
                      />
                      <FontAwesomeIcon
                        icon="trash-alt"
                        className="action-icon delete-icon"
                        onClick={() => handleDeleteProduct(product.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="pagination-info">
                Hiển thị {indexOfFirstItem + 1} đến {Math.min(indexOfLastItem, totalItems)} của {totalItems} kết quả
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

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Select name="categoryId" value={formData.categoryId} onChange={handleInputChange} required>
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.type})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giảm giá (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </Form.Group>

            <h5 className="mt-4 mb-3">Thuộc tính sản phẩm</h5>

            <div
              className="attributes-container"
              style={{ maxHeight: formData.productAttributes.length > 2 ? "400px" : "auto" }}
            >
              {formData.productAttributes.map((attr, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Thuộc tính #{index + 1}</h6>
                      {formData.productAttributes.length > 1 && (
                        <Button variant="danger" size="sm" onClick={() => removeAttribute(index)}>
                          Xóa
                        </Button>
                      )}
                    </div>

                    <Form.Group className="mb-3">
                      <Form.Label>Hình ảnh</Form.Label>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(index, e)}
                          ref={(el) => (fileInputRefs.current[index] = el)}
                        />
                        {attr.image && (
                          <div className="ms-2">
                            <img
                              src={attr.image || "/placeholder.svg"}
                              alt="Preview"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                          </div>
                        )}
                      </div>
                    </Form.Group>

                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Kích thước</Form.Label>
                          <Form.Control
                            type="text"
                            value={attr.size}
                            onChange={(e) => handleAttributeChange(index, "size", e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Màu sắc</Form.Label>
                          <Form.Control
                            type="text"
                            value={attr.color}
                            onChange={(e) => handleAttributeChange(index, "color", e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Số lượng</Form.Label>
                          <Form.Control
                            type="number"
                            value={attr.quality}
                            onChange={(e) => handleAttributeChange(index, "quality", e.target.value)}
                            min="0"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Button variant="outline-primary" className="mb-4" onClick={addAttribute}>
              Thêm thuộc tính
            </Button>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                Lưu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  )
}

export default ProductManagement
