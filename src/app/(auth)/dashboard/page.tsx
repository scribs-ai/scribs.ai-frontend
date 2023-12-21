"use client"

import React from 'react'

import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

const page = () => {
  return (
    <>
      <h1 className='text-4xl'>Welcome to dashboard</h1>
      <Link
        className={buttonVariants({ variant: "default" })}
        href={'/sign-in'}
        onClick={() => {
          localStorage.removeItem("user");
          toast({ title: 'Logout Successfully' })
        }}
      >
        Logout
      </Link>
    </>
  )
}

export default page