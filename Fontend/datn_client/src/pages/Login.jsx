"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { authService, accountApi } from "../services/apiModuleUser";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    emailPhoneNumber: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.emailPhoneNumber.trim()) {
      toast.error("Vui lòng nhập email hoặc số điện thoại")
      return
    }

    if (!formData.password) {
      toast.error("Vui lòng nhập mật khẩu")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await accountApi.login(formData)

      // Save user data and token
      await authService.login(response)

      // Update login status
      setIsLoggedIn(true)

      toast.success("Đăng nhập thành công!")
      navigate("/")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Đăng nhập</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="emailPhoneNumber" className="form-label">
                      Email hoặc Số điện thoại
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="emailPhoneNumber"
                        name="emailPhoneNumber"
                        value={formData.emailPhoneNumber}
                        onChange={handleChange}
                        placeholder="Nhập email hoặc số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="password" className="form-label">
                        Mật khẩu
                      </label>
                      <Link to="/forgot-password" className="text-decoration-none small">
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
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
                        "Đăng nhập"
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-decoration-none">
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
