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

import { TwoFactorAuthApi } from "@/app/api/authService";


const TwoFactorAuthFormSchema = z
  .object({
    otp: z
      .string()
      .min(1, 'Enter otp')
      .min(6, 'opt should be of 6-digit')
  })

const TwoFactorAuthForm: FC = () => {
  const router = useRouter()
  const defaultValues = {
    otp: ''
  }

  const form = useForm<z.infer<typeof TwoFactorAuthFormSchema>>({
    resolver: zodResolver(TwoFactorAuthFormSchema),
    mode: "onChange",
    defaultValues
  })

  const onSubmit = async (data: z.infer<typeof TwoFactorAuthFormSchema>) => {
    await TwoFactorAuthApi({ ...data })
      .then(() => {
        toast({
          title: 'Logged In successful, Welcome.'
        })
        router.push('/dashboard')
      })
      .catch((error: any) => {
        if (error.message === 'Invalid OTP') {
          form.setError('otp', {
            type: 'manual',
            message: 'Invalid OTP',
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
        <CardTitle className="text-2xl">2-Factor Authentication</CardTitle>
        <CardDescription>
          Enter 6-digit verification code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit">Verify</Button>
          </form>
        </Form>
      </CardContent>

    </Card>
  )
}

export default TwoFactorAuthForm;