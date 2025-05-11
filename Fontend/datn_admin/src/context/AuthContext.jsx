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
  const login = (userData) => {
    // In a real app, this would validate with a backend
    // For this example, we'll use hardcoded credentials
    const validCredentials = {
      emailPhoneNumber: "Admin@gmail.com",
      password: "Admin",
    }

    if (
      userData.emailPhoneNumber === validCredentials.emailPhoneNumber &&
      userData.password === validCredentials.password
    ) {
      const user = {
        name: "Hizrian",
        email: userData.emailPhoneNumber,
        role: "Admin",
      }

      setUser(user)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(user))
      return { success: true }
    }

    return {
      success: false,
      message: "Email/số điện thoại hoặc mật khẩu không đúng",
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
