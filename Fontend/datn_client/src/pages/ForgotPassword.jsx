"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { accountApi } from "../services/apiModuleUser"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [userName, setUserName] = useState("")
  const [accountId, setAccountId] = useState(null)
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUserNameChange = (e) => {
    setUserName(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRequestReset = async (e) => {
    e.preventDefault()

    if (!userName.trim()) {
      toast.error("Vui lòng nhập email hoặc tên đăng nhập")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await accountApi.getAccountByUserName(userName)

      if (response && response.accountId) {
        setAccountId(response.accountId)
        toast.success("Xác thực thành công. Vui lòng nhập mật khẩu mới")
        setStep(2)
      } else {
        toast.error("Không tìm thấy tài khoản với thông tin đã nhập")
      }
    } catch (error) {
      console.error("Error requesting password reset:", error)
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

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
      console.log(formData.newPassword)
      await accountApi.updatePassword(accountId, formData.newPassword)

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
                        Nhập địa chỉ email hoặc tên đăng nhập của bạn để đặt lại mật khẩu.
                      </p>
                      <label htmlFor="userName" className="form-label">
                        Email hoặc tên đăng nhập
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          value={userName}
                          onChange={handleUserNameChange}
                          placeholder="Nhập email hoặc tên đăng nhập"
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
                          "Tiếp tục"
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                      <p className="text-muted mb-4">Vui lòng nhập mật khẩu mới cho tài khoản của bạn.</p>

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
                    </div>

                    <div className="d-grid gap-2">
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
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setStep(1)}
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                        Quay lại
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

                {step !== 3 && (
                  <div className="text-center mt-4">
                    <p className="mb-0">
                      <Link to="/login" className="text-decoration-none">
                        Quay lại đăng nhập
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
