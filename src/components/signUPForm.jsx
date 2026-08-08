import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/api-client"

const SignUPForm = ({ onSwitchToSignIn }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(name, email, password)
      const createNew = searchParams.get('createNew')
      if (createNew) {
        const url = await api.post('/urls', { originalUrl: createNew })
        navigate(`/link/${url._id}`)
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm p-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="UserName">User Name</Label>
              <Input
                id="UserName"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button size="sm" type="submit" className="mt-6 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 font-semibold text-gray-950 hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400" disabled={loading}>
            {loading ? 'Creating...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center border-t border-white/10">
        <p className="text-sm text-slate-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="font-medium text-amber-400 transition hover:text-amber-300"
          >
            Sign in
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}

export default SignUPForm
