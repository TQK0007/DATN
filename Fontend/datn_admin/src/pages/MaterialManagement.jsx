"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, Table, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  materialApi,
  uploadImageMaterial,
} from "../services/apiModuleManageProduct";

const MaterialManagement = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    color: "",
    image: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMaterialAndPage, setTotalMaterialAndPage] = useState({
    count: 1,
    page: 1,
  }); // Giả định có 1 trang
  const [triggerReload, setTriggerReload] = useState(false);
  const itemsPerPage = 5;
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMaterials();
    fetchTotalMaterialAndPage();
  }, [triggerReload]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await materialApi.getMaterials(currentPage);
      console.log(data);
      setMaterials(data);
    } catch (error) {
      console.error("Không thể tải dữ liệu vật liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalMaterialAndPage = async () => {
    try {
      setLoading(true);
      const data = await materialApi.getTotalMaterialAndPage();
      setTotalMaterialAndPage(data);
    } catch (error) {
      console.error("Không thể tải dữ liệu danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = () => {
    setCurrentMaterial(null);
    setFormData({
      name: "",
      price: 0,
      color: "",
      image: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleEditMaterial = (material) => {
    setCurrentMaterial(material);
    setFormData({
      name: material.name,
      price: material.price,
      color: material.color,
      image: material.Image, // Lưu ý: API trả về "Image" với chữ I viết hoa
      description: material.description || "",
    });
    setShowModal(true);
  };

  const handleDeleteMaterial = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vật liệu này không?")) {
      try {
        await materialApi.deleteMaterial(id);
        setTriggerReload((prev) => !prev);
      } catch (error) {
        console.error("Không thể xóa vật liệu:", error);
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageMaterial(file);
        setFormData({
          ...formData,
          image: imageUrl,
        });
      } catch (error) {
        console.error("Không thể tải lên hình ảnh:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMaterial) {
        await materialApi.updateMaterial(currentMaterial.id, formData);
      } else {
        await materialApi.createMaterial(formData);
      }
      setTriggerReload((prev) => !prev);
      setShowModal(false);
    } catch (error) {
      console.error("Không thể lưu vật liệu:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTriggerReload((prev) => !prev);
  };

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = materials.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = totalMaterialAndPage.count;
  const totalPages = totalMaterialAndPage.page;

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title">Quản lý vật liệu</h5>
          <Button variant="primary" onClick={handleAddMaterial}>
            Thêm vật liệu
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
                  <th>Màu sắc</th>
                  <th>Hình ảnh</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td>{material.id}</td>
                    <td>{material.name}</td>
                    <td>{material.price.toLocaleString()}đ</td>
                    <td>{material.color}</td>
                    <td>
                      <img src={material.Image} alt="hình ảnh" style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}/>
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon="edit"
                        className="action-icon edit-icon"
                        onClick={() => handleEditMaterial(material)}
                      />
                      <FontAwesomeIcon
                        icon="trash-alt"
                        className="action-icon delete-icon"
                        onClick={() => handleDeleteMaterial(material.id)}
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
            {currentMaterial ? "Sửa vật liệu" : "Thêm vật liệu"}
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
            <Form.Group className="mb-3">
              <Form.Label>Màu sắc</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                {formData.image && (
                  <div className="ms-2">
                    <img
                      src={formData.image || "/placeholder.svg"}
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
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
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

export default MaterialManagement;
