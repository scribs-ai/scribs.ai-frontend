"use client"

import { FC } from "react";

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

import { ForgotPasswordApi } from "@/app/api/authService";

const ForgetPasswordFormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format'),
  })

const ForgetPasswordForm: FC = () => {
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
    await ForgotPasswordApi({ ...data })
      .then(() => {
        toast({
          title: 'Verification link has been sent to your registered email address.'
        })
        router.push('/sign-in')
      })
      .catch((error: any) => {
        if (error.message === 'Email not found') {
          form.setError('email', {
            type: 'manual',
            message: 'Email not found',
          });
        } else {
          toast({
            title: error.message,
          });
        }
      })
  }

  return (
    <Card>
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
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit">Send Reset Link</Button>
          </form>
        </Form>
      </CardContent>

    </Card>
  )
}

export default ForgetPasswordForm;