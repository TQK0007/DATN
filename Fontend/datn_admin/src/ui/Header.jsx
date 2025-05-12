"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dropdown } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import "./Header.css"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="search-container">
        <FontAwesomeIcon icon="search" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm ..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="header-actions">
        <button className="header-action-button">
          <FontAwesomeIcon icon="envelope" />
        </button>
        <button className="header-action-button notification-button">
          <FontAwesomeIcon icon="bell" />
          <span className="notification-badge">2</span>
        </button>
        <Dropdown>
          <Dropdown.Toggle as="div" className="user-profile">
            <div className="user-avatar">
              <span>{user?.username?.charAt(0) || "H"}</span>
            </div>
            <div className="user-info">
              <span>Xin chào, {user?.username.split("@")[0] || "Hizrian"}</span>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item>
              <FontAwesomeIcon icon="user" className="me-2" /> Hồ sơ
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon="cog" className="me-2" /> Cài đặt
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              <FontAwesomeIcon icon="sign-out-alt" className="me-2" /> Đăng xuất
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
