"use client"

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <h1 className='text-4xl'>Welcome to dashboard</h1>
      <Link className={buttonVariants({ variant: "default" })} href={'/sign-in'} onClick={() => localStorage.removeItem("user")} >Logout</Link>
    </>
  )
}

export default page