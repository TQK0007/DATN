"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faSave,
  faEye,
  faEyeSlash,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons"
import { authService } from "../services/apiModuleUser"

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    sex: true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const user = authService.getCurrentUser()
        if (!user || !user.userId) {
          setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.")
          setIsLoading(false)
          return
        }

        const response = await fetch(`http://localhost:8080/api/account/profile/${user.userId}`, {
          headers: {
            Authorization: user.token,
          },
        })

        if (!response.ok) {
          throw new Error(`Lỗi khi lấy thông tin: ${response.status}`)
        }

        const profileData = await response.json()
        setFormData({
          firstName: profileData.firstName || "",
          lastName: profileData.lastName || "",
          email: profileData.email || "",
          phoneNumber: profileData.phoneNumber || "",
          password: "", // Không hiển thị mật khẩu
          sex: profileData.sex !== undefined ? profileData.sex : true,
        })

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Có lỗi xảy ra khi tải thông tin cá nhân. Vui lòng thử lại sau.")
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      // Validate form
      if (!formData.firstName.trim()) {
        toast.error("Vui lòng nhập tên")
        setIsSubmitting(false)
        return
      }

      if (!formData.lastName.trim()) {
        toast.error("Vui lòng nhập họ")
        setIsSubmitting(false)
        return
      }

      if (!formData.email.trim()) {
        toast.error("Vui lòng nhập email")
        setIsSubmitting(false)
        return
      }

      if (!formData.phoneNumber.trim()) {
        toast.error("Vui lòng nhập số điện thoại")
        setIsSubmitting(false)
        return
      }

      const user = authService.getCurrentUser()
      if (!user || !user.userId) {
        toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.")
        setIsSubmitting(false)
        return
      }

      // Nếu người dùng không nhập mật khẩu mới, gửi request không có trường password
      const updateData = { ...formData }
      if (!updateData.password.trim()) {
        delete updateData.password
      }

      const response = await fetch(`http://localhost:8080/api/account/updateProfile/${user.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error(`Lỗi khi cập nhật thông tin: ${response.status}`)
      }

      toast.success("Cập nhật thông tin thành công!")

      // Nếu người dùng đã thay đổi mật khẩu, yêu cầu đăng nhập lại
      if (formData.password.trim()) {
        toast.info("Bạn đã thay đổi mật khẩu. Vui lòng đăng nhập lại.")
        setTimeout(() => {
          authService.logout()
          window.location.href = "/login"
        }, 2000)
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      toast.error("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="profile-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Thông tin cá nhân</h3>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="firstName" className="form-label">
                        Họ
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
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Tên
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
                      Mật khẩu mới
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu mới nếu muốn thay đổi"
                      />
                      <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label d-block">Giới tính</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faVenusMars} />
                      </span>
                      <div className="form-control d-flex gap-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="sex"
                            id="sexMale"
                            checked={formData.sex === true}
                            onChange={() => setFormData({ ...formData, sex: true })}
                          />
                          <label className="form-check-label" htmlFor="sexMale">
                            Nam
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="sex"
                            id="sexFemale"
                            checked={formData.sex === false}
                            onChange={() => setFormData({ ...formData, sex: false })}
                          />
                          <label className="form-check-label" htmlFor="sexFemale">
                            Nữ
                          </label>
                        </div>
                      </div>
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
                        <>
                          <FontAwesomeIcon icon={faSave} className="me-2" />
                          Lưu thông tin
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
