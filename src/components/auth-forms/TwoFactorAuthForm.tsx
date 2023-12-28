"use client"

import { FC, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card, CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast";
import { Icons } from "../ui/icons";

import { twoFactorAuthApi } from "@/app/api/authService";
import { twoFactorAuthFormSchema } from "@/lib/schemas";

const TwoFactorAuthForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof twoFactorAuthFormSchema>>({
    resolver: zodResolver(twoFactorAuthFormSchema),
    mode: "onChange",
    defaultValues: {
      otp: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof twoFactorAuthFormSchema>) => {
    setIsLoading(true)
    await twoFactorAuthApi({ ...data })
      .then(() => {
        toast({
          title: 'Logged In successful, Welcome.'
        })
        setIsLoading(false)
        router.push('/dashboard')
      })
      .catch((error: any) => {
        if (error.message === 'Invalid OTP. Please enter a valid OTP.') {
          form.setError('otp', {
            type: 'manual',
            message: 'Invalid OTP',
          });
        } else {
          toast({
            title: error.message,
          });
        }
        setIsLoading(false)
      })
  }

  return (
    <Card className="w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">2-Factor Authentication</CardTitle>
        <CardDescription>
          Enter 6-digit verification code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl >
                    <Input type="text" maxLength={6} {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Verify
            </Button>
          </form>
        </Form>
      </CardContent>

    </Card>
  )
}

export default TwoFactorAuthForm;