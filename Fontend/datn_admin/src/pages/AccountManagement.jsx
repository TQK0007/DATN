"use client"

import { useState, useEffect } from "react"
import { Card, Button, Table, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { accountApi, userApi } from "../services/api"

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentAccount, setCurrentAccount] = useState(null)
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    roleName: "User",
    userId: "",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3) // Giả định có 3 trang
  const itemsPerPage = 10

  useEffect(() => {
    fetchAccounts()
    fetchUsers()
  }, [])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const data = await accountApi.getAccounts()
      setAccounts(data)
    } catch (error) {
      console.error("Không thể tải dữ liệu tài khoản:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const data = await userApi.getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Không thể tải dữ liệu người dùng:", error)
    }
  }

  const handleAddAccount = () => {
    setCurrentAccount(null)
    setFormData({
      email: "",
      phoneNumber: "",
      password: "",
      roleName: "User",
      userId: "",
    })
    setShowModal(true)
  }

  const handleEditAccount = (account) => {
    setCurrentAccount(account)
    setFormData({
      email: account.email,
      phoneNumber: account.phoneNumber,
      password: "",
      roleName: "User", // Giả định vai trò mặc định
      userId: account.userId.toString(),
    })
    setShowModal(true)
  }

  const handleDeleteAccount = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      try {
        await accountApi.deleteAccount(id)
        setAccounts(accounts.filter((account) => account.id !== id))
      } catch (error) {
        console.error("Không thể xóa tài khoản:", error)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentAccount) {
        await accountApi.updateAccount(currentAccount.id, formData)
        setAccounts(
          accounts.map((account) => (account.id === currentAccount.id ? { ...account, ...formData } : account)),
        )
      } else {
        const newAccount = await accountApi.createAccount(formData)
        setAccounts([...accounts, newAccount])
      }
      setShowModal(false)
    } catch (error) {
      console.error("Không thể lưu tài khoản:", error)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = accounts.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = accounts.length

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title">Quản lý tài khoản</h5>
          <Button variant="primary" onClick={handleAddAccount}>
            Thêm tài khoản
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
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>ID người dùng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((account) => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.email}</td>
                    <td>{account.phoneNumber}</td>
                    <td>{account.userId}</td>
                    <td>
                      <FontAwesomeIcon
                        icon="edit"
                        className="action-icon edit-icon"
                        onClick={() => handleEditAccount(account)}
                      />
                      <FontAwesomeIcon
                        icon="trash-alt"
                        className="action-icon delete-icon"
                        onClick={() => handleDeleteAccount(account.id)}
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
          <Modal.Title>{currentAccount ? "Sửa tài khoản" : "Thêm tài khoản"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={currentAccount ? "Để trống nếu không thay đổi" : ""}
                required={!currentAccount}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vai trò</Form.Label>
              <Form.Select name="roleName" value={formData.roleName} onChange={handleInputChange} required>
                <option value="User">Người dùng</option>
                <option value="Admin">Quản trị viên</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Người dùng</Form.Label>
              <Form.Select name="userId" value={formData.userId} onChange={handleInputChange} required>
                <option value="">Chọn người dùng</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </Form.Select>
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

export default AccountManagement
