"use client"

import { useState, useEffect } from "react"
import { Card, Button, Table, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { userApi } from "../services/api"

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    sex: false,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3) // Giả định có 3 trang
  const itemsPerPage = 10

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await userApi.getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Không thể tải dữ liệu người dùng:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = () => {
    setCurrentUser(null)
    setFormData({
      firstName: "",
      lastName: "",
      sex: false,
    })
    setShowModal(true)
  }

  const handleEditUser = (user) => {
    setCurrentUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
    })
    setShowModal(true)
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await userApi.deleteUser(id)
        setUsers(users.filter((user) => user.id !== id))
      } catch (error) {
        console.error("Không thể xóa người dùng:", error)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentUser) {
        await userApi.updateUser(currentUser.id, formData)
        setUsers(users.map((user) => (user.id === currentUser.id ? { ...user, ...formData } : user)))
      } else {
        const newUser = await userApi.createUser(formData)
        setUsers([...users, newUser])
      }
      setShowModal(false)
    } catch (error) {
      console.error("Không thể lưu người dùng:", error)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = users.length

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title">Quản lý người dùng</h5>
          <Button variant="primary" onClick={handleAddUser}>
            Thêm người dùng
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
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>Giới tính</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}</td>
                    <td>{user.sex ? "Nam" : "Nữ"}</td>
                    <td>
                      <FontAwesomeIcon
                        icon="edit"
                        className="action-icon edit-icon"
                        onClick={() => handleEditUser(user)}
                      />
                      <FontAwesomeIcon
                        icon="trash-alt"
                        className="action-icon delete-icon"
                        onClick={() => handleDeleteUser(user.id)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? "Sửa người dùng" : "Thêm người dùng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giới tính</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Nam"
                  name="sex"
                  id="sexMale"
                  checked={formData.sex === true}
                  onChange={() => setFormData({ ...formData, sex: true })}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Nữ"
                  name="sex"
                  id="sexFemale"
                  checked={formData.sex === false}
                  onChange={() => setFormData({ ...formData, sex: false })}
                />
              </div>
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
  )
}

export default UserManagement
