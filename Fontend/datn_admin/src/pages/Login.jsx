"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../context/AuthContext"
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    emailPhoneNumber: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await login(formData)

      if (result.success) {
        navigate("/")
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="login-card">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="logo-container mb-4">
                    <div className="logo-icon">
                      <span className="logo-circle logo-circle-1"></span>
                      <span className="logo-circle logo-circle-2"></span>
                    </div>
                    <h3 className="logo-text">HTAdmin</h3>
                  </div>
                  <h4 className="mb-3">Đăng nhập</h4>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="emailPhoneNumber"
                      placeholder="Email hoặc số điện thoại"
                      value={formData.emailPhoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      label="Ghi nhớ đăng nhập"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="mb-0"
                    />
                    <a href="#" className="text-decoration-none">
                      Quên mật khẩu?
                    </a>
                  </div>

                  <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                    {loading ? "Đang xử lý..." : "ĐĂNG NHẬP"}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="mb-2">
                      Chưa có tài khoản?{" "}
                      <a href="#" className="text-decoration-none">
                        Đăng ký
                      </a>
                    </p>
                    <p className="text-muted mb-3">hoặc đăng nhập với:</p>
                    <div className="social-login">
                      <Button variant="" className="social-btn">
                        <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                      </Button>
                      <Button variant="" className="social-btn">
                        <FontAwesomeIcon icon={["fab", "google"]} />
                      </Button>
                      <Button variant="" className="social-btn">
                        <FontAwesomeIcon icon={["fab", "twitter"]} />
                      </Button>
                      <Button variant="" className="social-btn">
                        <FontAwesomeIcon icon={["fab", "github"]} />
                      </Button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
