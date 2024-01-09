"use client"

import { useForm } from "react-hook-form"
import { FC, useState } from "react";

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

import { signInApi } from "@/app/api/authService";
import GoogleAuthButton from "../GoogleAuthButton";
import { signInFormSchema } from "@/lib/schemas";

const SignInForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof signInFormSchema>) => {
    try {
      setIsLoading(true);

      const response = await signInApi({ ...data });

      if (response) {
        if (!response.two_factor) {
          toast({
            title: 'Logged In successfully. Welcome.'
          });
          setIsLoading(false);
          router.replace('/dashboard');
        } else {
          toast({
            title: '6-digit verification code sent to your email.',
          });
          router.push('/twofactor-auth');
        }
      } else {
        toast({
          title: 'Sign-in failed. Please check your credentials.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'An error occurred during sign-in.',
        description: error.message || 'Unknown error',

      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome, Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <GoogleAuthButton />
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" autoComplete="username" {...field} disabled={isLoading} />
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
                    <Input placeholder="Enter your password" type="password" autoComplete="current-password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <Link className="text-blue-500 hover:underline" href={'/forgot-password'}>forgot password?</Link>
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button id="submit" className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className='text-center text-sm text-gray-600 mt-1'>
          If you don&apos;t have an account, please.{" "}
          <Link className="text-blue-500 hover:underline" href={'/sign-up'}>Sign up</Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default SignInForm;
