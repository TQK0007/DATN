"use client";

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faShoppingBag,
  faSearch,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons"
import { cartService } from "../services/api";
import { authService } from "../services/apiModuleUser";
import "../App.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [cartCount, setCartCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const updateCartCount = () => {
      const cart = cartService.getCart()
      setCartCount(cart.length)
    }

    updateCartCount()

    // Lắng nghe sự thay đổi trong localStorage
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        updateCartCount()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event để cập nhật số lượng trong giỏ hàng
    const handleCartUpdate = () => {
      updateCartCount()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  const handleLogout = () => {
    authService.logout()
    setIsLoggedIn(false)
    navigate("/")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Shop Thời Trang
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Danh mục
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/products?gender=nam">
                      Thời trang nam
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/products?gender=nu">
                      Thời trang nữ
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/products">
                      Tất cả sản phẩm
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <form className="search-form d-flex me-3" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>

            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  <Link to="/cart" className="btn btn-outline-primary position-relative me-2">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <div className="dropdown">
                    <button
                      className="btn btn-outline-primary dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                          Thông tin cá nhân
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orders">
                          <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
                          Đơn hàng của tôi
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header