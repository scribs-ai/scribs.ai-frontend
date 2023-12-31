"use client"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from "next/navigation";

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

import { resetPasswordApi } from "@/app/api/authService";
import { resetPasswordFormSchema } from "@/lib/schemas";


const ResetPasswordForm = (props: { token: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof resetPasswordFormSchema>) => {
    setIsLoading(true)
    await resetPasswordApi({ ...data, ...props })
      .then(() => {
        toast({
          title: 'Password changed successfully.'
        })
        setIsLoading(false)
        router.push('/sign-in')
      })
      .catch((error) => {
        if (error.message === "Invalid link or link expired.") {
          toast({
            title: 'Invalid link or link expired, try again.',
          });
        } else {
          toast({
            title: 'Failed to reset password. Please try again.'
          });
        }
        setIsLoading(false)
      });
  }

  return (
    <Card className="w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter new password
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" type="password" autoComplete="new-password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Re-enter your password" type="password" autoComplete="new-password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Change Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm;
