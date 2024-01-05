"use client"
import { useForm } from "react-hook-form"
import { ChangeEvent, FC, useState } from "react";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Link from "next/link"
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Icons } from "../ui/icons"
import { toast } from "../ui/use-toast";
import { Progress } from "../ui/progress";

import { signUpApi } from "@/app/api/authService";
import GoogleAuthButton from "../GoogleAuthButton";
import calculatePasswordStrength from "../calculatePasswordStrength";
import { signUpFormSchema } from "@/lib/schemas";

const SignUpForm: FC = () => {
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setPasswordValue(password);
    setPasswordStrength(calculatePasswordStrength(password));
    form.setValue('password', password);
  };

  const onSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
    try {
      setIsLoading(true);

      const response = await signUpApi({ ...data });

      setIsLoading(false);

      if (response) {
        toast({
          title: 'Account created, please verify to login.',
        });
        router.push('/user-verification');
      }
    } catch (error: any) {

      setIsLoading(false);

      toast({
        title: 'Sign up failed!',
        description: error.message || 'An error occurred during sign up.',
      });
    }
  };

  return (
    <Card className="w-96 mt-24">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
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
            <div className="">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="first name" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="last name" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                    <Input placeholder="Enter your password" type="password" autoComplete="new-password" {...field} disabled={isLoading} value={passwordValue} onChange={handlePasswordChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Progress value={passwordStrength} />
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
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className='text-center text-sm text-gray-600 mt-1'>
          If you already have an account, please.{" "}
          <Link className="text-blue-500 hover:underline" href={'/sign-in'}>Sign in</Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms-condition"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  )
}

export default SignUpForm;