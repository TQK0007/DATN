"use client";

import { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { categoryApi } from "../services/apiModuleManageProduct";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    wage: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategoryAndPage, setTotalCategoryAndPage] = useState({
    count: 1,
    page: 1,
  }); // Giả định có 1 trang
  const [triggerReload, setTriggerReload] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCategories();
    fetchTotalCategoryAndPage();
  }, [triggerReload]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryApi.getCategoryBypage(currentPage);
      setCategories(data);
    } catch (error) {
      console.error("Không thể tải dữ liệu danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalCategoryAndPage = async () => {
    try {
      setLoading(true);
      const data = await categoryApi.getTotalCategoryAndPage();
      setTotalCategoryAndPage(data);
    } catch (error) {
      console.error("Không thể tải dữ liệu danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setFormData({
      name: "",
      type: "",
      wage: 0,
    });
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      wage: category.wage,
    });
    setShowModal(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      try {
        await categoryApi.deleteCategory(id);
        setTriggerReload((prev) => !prev);
      } catch (error) {
        console.error("Không thể xóa danh mục:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCategory) {
        await categoryApi.updateCategory(currentCategory.id, formData);
      } else {
        await categoryApi.createCategory(formData);
      }
      setShowModal(false);
      setTriggerReload((prev) => !prev);
    } catch (error) {
      console.error("Không thể lưu danh mục:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTriggerReload((prev) => !prev);
  };

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = totalCategoryAndPage.count;
  const totalPages = totalCategoryAndPage.page;
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title">Quản lý danh mục</h5>
          <Button variant="primary" onClick={handleAddCategory}>
            Thêm danh mục
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
                  <th>Loại</th>
                  <th>Tiền công</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.type}</td>
                    <td>{category.wage.toLocaleString()}đ</td>
                    <td>
                      <FontAwesomeIcon
                        icon="edit"
                        className="action-icon edit-icon"
                        onClick={() => handleEditCategory(category)}
                      />
                      <FontAwesomeIcon
                        icon="trash-alt"
                        className="action-icon delete-icon"
                        onClick={() => handleDeleteCategory(category.id)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentCategory ? "Sửa danh mục" : "Thêm danh mục"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tiền công</Form.Label>
              <Form.Control
                type="number"
                name="wage"
                value={formData.wage}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
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
  );
};

export default CategoryManagement;
