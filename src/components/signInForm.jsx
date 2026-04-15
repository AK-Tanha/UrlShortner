import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



const SignInForm = () => {
  return (
    <>
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
                            <Input id="password" type="password" required placeholder="*********" />
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
    </>
  )
}

export default SignInForm

