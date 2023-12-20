"use client"
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className='text-4xl'>Welcome</h1>
      <div className="space-x-1">
        <Link className={buttonVariants({ variant: "default" })} href={'/sign-in'} >Sign In</Link>
        <Link className={buttonVariants({ variant: "default" })} href={'/sign-up'}  >Sign Up</Link>
      </div>
    </>)
}