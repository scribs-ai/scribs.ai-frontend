"use client"

import { useForm } from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Link from "next/link"
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card, CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Icons } from "../ui/icons"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast";

import { SignInApi } from "@/app/api/authService";
import { FC } from "react";

const SignInFormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format'),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have 8 characters"),
  })

const SignInForm:FC = () => {
  const router = useRouter()
  const defaultValues = {
    email: '',
    password: '',
  };

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
    defaultValues
  })

  const onSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    const response = await SignInApi({ ...data })
    if (response) {
      toast({
        title: '6-digit verification code sent to your email.'
      })
      router.push('/twofactor-auth')
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome, Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button variant="outline" className="w-full">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <Link className="text-blue-500 hover:underline" href={'/forgot-password'}>forgot password?</Link>
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit">Sign in </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className='text-center text-sm text-gray-600 mt-1'>
          If you don&apos;t have an account, please.
          <Link className="text-blue-500 hover:underline" href={'/sign-up'}>Sign up</Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default SignInForm;