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

import { forgotPasswordApi } from "@/app/api/authService";
import { Icons } from "../ui/icons";

const ForgetPasswordFormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format'),
  })

const ForgetPasswordForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const defaultValues = {
    email: ''
  }

  const form = useForm<z.infer<typeof ForgetPasswordFormSchema>>({
    resolver: zodResolver(ForgetPasswordFormSchema),
    mode: "onChange",
    defaultValues
  })

  const onSubmit = async (data: z.infer<typeof ForgetPasswordFormSchema>) => {
    setIsLoading(true)
    await forgotPasswordApi({ ...data })
      .then(() => {
        toast({
          title: 'Verification link has been sent to your registered email address.',
        });
        setIsLoading(false)
        router.push('/sign-in');
      })
      .catch((error: any) => {
        if (error.message === 'Email not found. Please check the email address provided.') {
          form.setError('email', {
            type: 'manual',
            message: 'Invalid email.',
          });
        } else {
          toast({
            title: 'Failed to initiate password reset. Please try again later.',
          });
        }
        setIsLoading(false)
      });
  }

  return (
    <Card className="w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to reset password
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" autoComplete="username"  {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Reset Link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ForgetPasswordForm;
