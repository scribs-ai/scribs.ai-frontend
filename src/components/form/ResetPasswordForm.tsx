"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
import { ResetPasswordApi } from "@/app/api/authService";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have 8 characters"),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  })

const ResetPasswordForm = (props: { token: string }) => {
  const router = useRouter();
  const defaultValues = {
    password: '',
    confirmPassword: ''
  }

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    mode: "onChange",
    defaultValues
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordFormSchema>) => {
    await ResetPasswordApi({ ...data, ...props })
      .then(() => {
        toast({
          title: 'Password changed successfully.'
        })
        router.push('/sign-in')
      })
      .catch((error) => {
        toast({
          title: 'An error occured, try again'
        })
      })
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
                    <Input placeholder="Enter your password" type="password" autoComplete="new-password" {...field} />
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
                    <Input placeholder="Re-enter your password" type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Change Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm;