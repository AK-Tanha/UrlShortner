import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Trash2, Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/api-client"

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [error, setError] = useState('')

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith('http')
      ? user.avatar
      : `${window.location.origin}${user.avatar}`
    : ''

  const avatarFallback = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U"

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setError("Only JPG, PNG, WEBP and GIF images are allowed")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB")
      return
    }

    setError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("avatar", file)
      const data = await api.upload("/users/me/avatar", formData)
      updateUser(data)
    } catch (err) {
      setError(err.message || "Failed to upload avatar")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    setError('')
    setRemoving(true)
    try {
      const data = await api.delete("/users/me/avatar")
      updateUser(data)
    } catch (err) {
      setError(err.message || "Failed to remove avatar")
    } finally {
      setRemoving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent sm:text-4xl">
          Profile
        </h1>
        <p className="text-sm text-slate-400">Manage your account and profile picture.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar card */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-center">Profile Picture</CardTitle>
            <CardDescription className="text-center">
              Upload a square image. JPG, PNG, WEBP or GIF up to 2MB.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.name || "Avatar"}
                className="h-28 w-28 rounded-full border-2 border-amber-400/40 object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-slate-600 bg-slate-900 text-4xl font-bold text-amber-400">
                {avatarFallback}
              </div>
            )}

            {error && (
              <p className="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-xs text-red-400">
                {error}
              </p>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 font-semibold text-gray-950 hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </Button>
              {user?.avatar && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-red-400"
                  disabled={removing}
                  onClick={handleRemove}
                >
                  {removing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Remove
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account info card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your login details. Contact an admin to change these.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="profile-name">Name</Label>
              <Input id="profile-name" value={user?.name || ""} readOnly className="opacity-70" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" value={user?.email || ""} readOnly className="opacity-70" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-role">Role</Label>
              <Input id="profile-role" value={user?.role || ""} readOnly className="opacity-70" />
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
