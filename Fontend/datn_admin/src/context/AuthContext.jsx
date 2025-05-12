"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => { 
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  // Login function
  
  const login = async (userData) => {
  try {
    const response = await fetch("http://localhost:8080/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      return {
        success: false,
        message: "Email/số điện thoại hoặc mật khẩu không đúng",
      }
    }

    const token = await response.text()

    // Giải mã payload từ JWT (tùy chọn, hoặc bạn có thể giữ nguyên token)
    const payloadBase64 = token.split('.')[1]
    const decodedPayload = JSON.parse(atob(payloadBase64))

    const user = {
      userId: decodedPayload.userId,
      username: decodedPayload.username,
      token: token, // bạn nên lưu token để sử dụng sau này
    }

    setUser(user)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(user))


    return { success: true }

  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "Đã có lỗi xảy ra khi đăng nhập",
    }
  }
  
}


  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
