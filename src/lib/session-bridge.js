import { getAccessToken, getRefreshToken, getStoredUser } from "@/lib/api-client"

const SESSION_TYPE = "URL_SHORTENER_SESSION"
const REQUEST_TYPE = "URL_SHORTENER_SESSION_REQUEST"

// Send the current session to a newly opened admin panel window.
// The admin app may still be loading, so we retry posting until it responds.
// Note: no "noopener" so the admin panel can reach us via window.opener
// and we can push the session to it. Origin checks keep this secure.
export function openAdminPanel(adminUrl) {
  const user = getStoredUser()
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  if (!user || !accessToken) {
    window.location.href = adminUrl
    return
  }

  const win = window.open(adminUrl, "_blank")
  if (!win) return

  const target = new URL(adminUrl).origin
  const payload = { type: SESSION_TYPE, user, accessToken, refreshToken }

  const send = () => {
    try {
      win.postMessage(payload, target)
    } catch {
      clearInterval(interval)
    }
  }

  const interval = setInterval(send, 300)
  window.setTimeout(() => clearInterval(interval), 8000)
}

// The admin panel requests the session from its opener on load.
export function initSessionBridge(frontendUrl) {
  const source = new URL(frontendUrl).origin

  window.addEventListener("message", (event) => {
    if (event.origin !== source) return
    if (event.data?.type !== REQUEST_TYPE) return

    const user = getStoredUser()
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    if (!user || !accessToken) return

    event.source.postMessage(
      { type: SESSION_TYPE, user, accessToken, refreshToken },
      source
    )
  })
}
