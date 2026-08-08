import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import SignUpForm from "@/components/signUPForm"
import SignInForm from "@/components/signInForm"
import { useAuth } from "@/context/AuthContext"


const AuthPage = () => {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('signin')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center px-2">
      <h1 className="mb-3 bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text pt-2 text-center text-3xl font-bold text-transparent sm:text-4xl">
        Welcome to the Auth Page
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-sm pt-4">
        <TabsList className="w-full">
          <TabsTrigger value="signin">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="signup">
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* Sign-in Form */}
        <TabsContent value="signin" className="mt-4">
          <SignInForm onSwitchToSignUp={() => setActiveTab('signup')} />
        </TabsContent>

        {/* Sign-up Form */}
        <TabsContent value="signup" className="mt-4">
          <SignUpForm onSwitchToSignIn={() => setActiveTab('signin')} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthPage
