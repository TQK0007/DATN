"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="logo">
            <span className="logo-icon">
              <span className="logo-circle logo-circle-1"></span>
              <span className="logo-circle logo-circle-2"></span>
            </span>
            <span className="logo-text" style={{ color: "white" }}>
              HTAdmin
            </span>
          </div>
        )}
        <button className="toggle-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon="bars" />
        </button>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <Link
            to="/"
            className={`sidebar-item ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="tachometer-alt" className="sidebar-icon" />
            {!collapsed && <span className="sidebar-text">Trang chủ</span>}
          </Link>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">
            {!collapsed && <span>THÀNH PHẦN</span>}
          </div>
          <Link
            to="/users"
            className={`sidebar-item ${
              location.pathname === "/users" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="users" className="sidebar-icon" />
            {!collapsed && <span className="sidebar-text">Danh sách người dùng</span>}
          </Link>
          <Link
            to="/products"
            className={`sidebar-item ${
              location.pathname === "/products" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="shopping-cart" className="sidebar-icon" />
            {!collapsed && <span className="sidebar-text">Danh sách sản phẩm</span>}
          </Link>
          <Link
            to="/materials"
            className={`sidebar-item ${
              location.pathname === "/materials" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="boxes" className="sidebar-icon" />
            {!collapsed && <span className="sidebar-text">Danh sách vật liệu</span>}
          </Link>
          <Link
            to="/orders"
            className={`sidebar-item ${
              location.pathname === "/orders" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="clipboard-list" className="sidebar-icon" />
            {!collapsed && <span className="sidebar-text">Danh sách đơn hàng</span>}
          </Link>
          <Link
            to="/categories"
            className={`sidebar-item ${
              location.pathname === "/categories" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="folder-open" className="sidebar-icon" />
            {!collapsed && <span className="sidebar-text">Danh sách danh mục</span>}
          </Link>
          <Link
            to="/accounts"
            className={`sidebar-item ${
              location.pathname === "/accounts" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="user-circle" className="sidebar-icon" />
            {!collapsed && <span className="sidebar-text">Danh sách tài khoản</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
