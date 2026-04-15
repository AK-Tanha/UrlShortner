import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import SignUpForm from "@/components/signUPForm"
import SignInForm from "@/components/signInForm"


const AuthPage = () => {
  return (
    <div className='mx-auto'>
      <h1 className="text-4xl font-bold text-amber-400 text-center pt-5">Welcome to the Auth Page</h1>

        <Tabs defaultValue="signup" className="w-100">

          <TabsList variant="line">
            <TabsTrigger
              value="signup"
            >
              Sign Up
            </TabsTrigger>
            <TabsTrigger
              value="signin"
            >
              Sign In
            </TabsTrigger>
          </TabsList>

          {/* Sign-up Form */}
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>

          {/* Sign-in Form */}
          <TabsContent value="signin">
            <SignInForm />
          </TabsContent>

        </Tabs>


    </div>
  )
}

export default AuthPage