"use Client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Card, CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast";
import { Icons } from "../ui/icons";

import { userVerificationApi } from "@/app/api/authService";

const UserVerification = (props: { token: string }) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = async () => {
    setIsLoading(true)
    await userVerificationApi({ ...props })
      .then(() => {
        toast({
          title: 'Logged in successfully, welcome.'
        })
        setIsLoading(false)
        router.push('/dashboard')
      })
      .catch(() => {
        toast({
          title: 'Unable to verify, please try again,',
        })
        setIsLoading(false)
      });

  }

  return (
    <Card className="w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Account Verification</CardTitle>
        <CardDescription>
          Press the button below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full mt-6" type="submit" onClick={() => handleClick()}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Verify
        </Button>
      </CardContent>

    </Card>
  )
}

export default UserVerification;