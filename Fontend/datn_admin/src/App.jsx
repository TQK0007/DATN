"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./ui/Sidebar"
import Header from "./ui/Header"
import Dashboard from "./pages/Dashboard"
import UserManagement from "./pages/UserManagement"
import ProductManagement from "./pages/ProductManagement"
import MaterialManagement from "./pages/MaterialManagement"
import OrderManagement from "./pages/OrderManagement"
import CategoryManagement from "./pages/CategoryManagement"
import AccountManagement from "./pages/AccountManagement"
import Login from "./pages/Login"
import { AuthProvider, useAuth } from "./context/AuthContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Layout component for dashboard
const DashboardLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/materials" element={<MaterialManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/accounts" element={<AccountManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
