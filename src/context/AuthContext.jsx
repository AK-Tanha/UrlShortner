import { createContext, useContext, useState, useCallback } from "react"
import { api, setSession, clearSession, getStoredUser, setStoredUser } from "@/lib/api-client"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  const login = useCallback(async (email, password) => {
    const data = await api.post("/auth/login", { email, password })
    setSession(data)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (name, email, password) => {
    const data = await api.post("/auth/register", { name, email, password })
    setSession(data)
    setUser(data.user)
    return data.user
  }, [])

  // Update the user object in state + localStorage (used after avatar/profile changes)
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser)
    setStoredUser(updatedUser)
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout")
    } catch {
      // ignore logout errors
    }
    clearSession()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
