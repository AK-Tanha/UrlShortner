import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const AuthPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-amber-400 text-center">Welcome to the Auth Page</h1>
      <div className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <Tabs defaultValue="Sign-up" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-slate-900/90 p-1 mb-6 border border-slate-700  ">
            <TabsTrigger value="Sign-up" className="border-r-2">Sign Up</TabsTrigger>
            <TabsTrigger value="Sign-in" className="">
              Sign In
            </TabsTrigger>
          </TabsList>

          {/* Sign-up Form */}
          <TabsContent value="Sign-up">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className=" text-center text-2xl font-bold" >Create your account</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="UserName">User Name</Label>
                      <Input
                        id="UserName"
                        type="text"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>

                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center ">
                <Button variant="destructive" size="sm" type="submit" className="w-1/4 border-amber-950">
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Sign-in Form */}
          <TabsContent value="Sign-in">
            <Card className="w-full max-w-sm p-4">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold" >Sign-in to your account</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>

                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center ">
                <Button variant="destructive" size="sm" type="submit" className="w-1/4 border-amber-950">
                  Sign In
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>


        </Tabs>
      </div>


    </div>
  )
}

export default AuthPage
