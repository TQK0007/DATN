"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { accountApi } from "../services/apiModuleUser"

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRequestReset = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error("Vui lòng nhập email")
      return
    }

    try {
      setIsSubmitting(true)
      await accountApi.forgotPassword(email)
      toast.success("Mã xác nhận đã được gửi đến email của bạn")
      setStep(2)
    } catch (error) {
      console.error("Error requesting password reset:", error)
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!formData.token.trim()) {
      toast.error("Vui lòng nhập mã xác nhận")
      return
    }

    if (!formData.newPassword) {
      toast.error("Vui lòng nhập mật khẩu mới")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp")
      return
    }

    try {
      setIsSubmitting(true)
      await accountApi.resetPassword({
        email,
        token: formData.token,
        newPassword: formData.newPassword,
      })
      toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.")
      setStep(3)
    } catch (error) {
      console.error("Error resetting password:", error)
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="forgot-password-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Quên mật khẩu</h2>

                {step === 1 && (
                  <form onSubmit={handleRequestReset}>
                    <div className="mb-4">
                      <p className="text-muted mb-4">
                        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn mã xác nhận để đặt lại mật khẩu.
                      </p>
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
                          value={email}
                          onChange={handleEmailChange}
                          placeholder="Nhập email của bạn"
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
                          "Gửi mã xác nhận"
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                      <p className="text-muted mb-4">
                        Vui lòng nhập mã xác nhận đã được gửi đến email {email} và mật khẩu mới của bạn.
                      </p>
                      <label htmlFor="token" className="form-label">
                        Mã xác nhận
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="token"
                        name="token"
                        value={formData.token}
                        onChange={handleChange}
                        placeholder="Nhập mã xác nhận"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        Mật khẩu mới
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu mới"
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
                          placeholder="Nhập lại mật khẩu mới"
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
                          "Đặt lại mật khẩu"
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <div className="text-center">
                    <div className="alert alert-success mb-4">Mật khẩu của bạn đã được đặt lại thành công!</div>
                    <Link to="/login" className="btn btn-primary">
                      Đăng nhập ngay
                    </Link>
                  </div>
                )}

                <div className="text-center mt-4">
                  <p className="mb-0">
                    <Link to="/login" className="text-decoration-none">
                      Quay lại đăng nhập
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

export default ForgotPassword
