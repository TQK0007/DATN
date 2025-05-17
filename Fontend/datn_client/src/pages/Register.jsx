"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faPhone, faLock } from "@fortawesome/free-solid-svg-icons"
import { accountApi } from "../services/apiModuleUser"

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.firstName.trim()) {
      toast.error("Vui lòng nhập tên")
      return
    }

    if (!formData.lastName.trim()) {
      toast.error("Vui lòng nhập họ")
      return
    }

    if (!formData.email.trim()) {
      toast.error("Vui lòng nhập email")
      return
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Vui lòng nhập số điện thoại")
      return
    }

    if (!formData.password) {
      toast.error("Vui lòng nhập mật khẩu")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp")
      return
    }

    try {
      setIsSubmitting(true)

      // Remove confirmPassword from data sent to API
      const { confirmPassword, ...registerData } = formData

      console.log(registerData)
      await accountApi.register(registerData)

      toast.success("Đăng ký thành công! Vui lòng đăng nhập.")
      navigate("/login")
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Đăng ký thất bại. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Đăng ký tài khoản</h2>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Họ
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Nhập họ"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        Tên
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Nhập tên"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Nhập email"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Số điện thoại
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Mật khẩu
                    </label>
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

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Xác nhận mật khẩu
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu"
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
                        "Đăng ký"
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-decoration-none">
                      Đăng nhập
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

export default Register
