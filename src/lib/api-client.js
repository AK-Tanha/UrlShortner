const API_BASE = `${import.meta.env.VITE_API_URL || ""}/api/v1`

export const getAccessToken = () => localStorage.getItem("accessToken")
export const getRefreshToken = () => localStorage.getItem("refreshToken")

let refreshPromise = null

async function refreshTokens() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error("No refresh token")

  const res = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  })

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    clearSession()
    throw new Error(json.message || "Session expired")
  }

  localStorage.setItem("accessToken", json.data.accessToken)
  localStorage.setItem("refreshToken", json.data.refreshToken)
  return json.data.accessToken
}

async function request(endpoint, { method = "GET", body, params } = {}) {
  let url = `${API_BASE}${endpoint}`
  if (params) {
    const search = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) search.set(key, String(value))
    })
    const qs = search.toString()
    if (qs) url += `?${qs}`
  }

  const options = { method, headers: {} }
  if (body !== undefined) {
    options.headers["Content-Type"] = "application/json"
    options.body = JSON.stringify(body)
  }

  const accessToken = getAccessToken()
  if (accessToken) options.headers["Authorization"] = `Bearer ${accessToken}`

  let response = await fetch(url, options)

  if (response.status === 401 && getRefreshToken()) {
    try {
      if (!refreshPromise) refreshPromise = refreshTokens()
      const newToken = await refreshPromise
      refreshPromise = null
      options.headers["Authorization"] = `Bearer ${newToken}`
      response = await fetch(url, options)
    } catch {
      throw new Error("Session expired, please sign in again")
    }
  }

  const json = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(json.message || `Request failed with status ${response.status}`)
  }

  return json.data
}

export const api = {
  get: (endpoint, params) => request(endpoint, { params }),
  post: (endpoint, body) => request(endpoint, { method: "POST", body }),
  patch: (endpoint, body) => request(endpoint, { method: "PATCH", body }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
  // Upload a file (FormData) without setting Content-Type so the browser sets the boundary
  upload: async (endpoint, formData) => {
    let url = `${API_BASE}${endpoint}`
    const options = { method: "POST", headers: {}, body: formData }

    const accessToken = getAccessToken()
    if (accessToken) options.headers["Authorization"] = `Bearer ${accessToken}`

    let response = await fetch(url, options)

    if (response.status === 401 && getRefreshToken()) {
      try {
        if (!refreshPromise) refreshPromise = refreshTokens()
        const newToken = await refreshPromise
        refreshPromise = null
        options.headers["Authorization"] = `Bearer ${newToken}`
        response = await fetch(url, options)
      } catch {
        throw new Error("Session expired, please sign in again")
      }
    }

    const json = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(json.message || `Request failed with status ${response.status}`)
    }

    return json.data
  },
}

export const getStoredUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export const setStoredUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const setSession = ({ user, tokens }) => {
  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("accessToken", tokens.accessToken)
  localStorage.setItem("refreshToken", tokens.refreshToken)
}

export const clearSession = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}
