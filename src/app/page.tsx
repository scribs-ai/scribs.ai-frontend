"use client"

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <h1 className='text-4xl'>Welcome</h1>
      <div className="space-x-2 m-3">
        <Link className={buttonVariants({ variant: "default" })} href={'/sign-in'} >Sign In</Link>
        <Link className={buttonVariants({ variant: "default" })} href={'/sign-up'}  >Sign Up</Link>
      </div>
    </>)
}

export default Home;