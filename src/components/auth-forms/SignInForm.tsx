'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Form, FormField, FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import { toast } from '../ui/use-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { signInFormSchema } from '@/lib/schemas';
import { signInApi } from '@/app/api/authService';
import { useRouter } from 'next/navigation';

interface SocialConnectProps {
  icon: JSX.Element;
  text: string;
}

const SocialConnect: React.FC<SocialConnectProps> = ({ icon, text }) => {
  return (
    <div className='flex items-center justify-start'>
      {icon}
      <Button variant='link' className='text-sm'>
        {text}
      </Button>
    </div>
  );
};

const SignInForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInFormSchema>) => {
    try {
      setIsLoading(true);

      const response = await signInApi({ ...data });

      if (response) {
        if (!response.two_factor) {
          toast({
            title: 'Logged In successfully. Welcome.',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center mb-4 md:border-b border-slate-500'>
                  <Mail color='#a9a9a9' />
                  <Input
                    className='flex-1 border-0'
                    placeholder='Email or Phone'
                    autoComplete='username'
                    {...field}
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center md:border-b border-slate-500 mb-1'>
                  <Lock color='#a9a9a9' />
                  <Input
                    className='flex-1 border-0'
                    placeholder='Password'
                    type={!showPassword ? 'password' : 'text'}
                    autoComplete='current-password'
                    {...field}
                    disabled={isLoading}
                  />
                  {!showPassword ?
                    <Eye color='#a9a9a9' onClick={() => setShowPassword(!showPassword)} />
                    :
                    <EyeOff color='#a9a9a9' onClick={() => setShowPassword(!showPassword)} />}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mb-7 flex justify-end'>
          <Link href='forgot-password' className='text-sm text-gray-500 border-b border-gray-500'>
            Forgot Password
          </Link>
        </div>
        <div className='flex flex-col items-center space-y-3 mb-6'>
          <Button
            id='submit'
            type='submit'
            disabled={isLoading}
            className='w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            LOGIN
          </Button>
          <Link href='sign-up' className='text-sm text-gray-500 border-b border-gray-500'>
            Create an Account
          </Link>
        </div>
      </form>
      <div className='pl-24'>
        <SocialConnect icon={<Icons.facebook className='size-6' />} text='Connect Facebook Account' />
        <SocialConnect icon={<Icons.google className='size-6' />} text='Connect Google Account' />
      </div>
    </Form>
  );
};

export default SignInForm;
