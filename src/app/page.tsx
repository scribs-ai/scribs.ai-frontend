"use client"

import Link from "next/link";


import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-8 md:p-32 text-center">
        <h1 className="text-gray-800 text-4xl ">Welcome to Scribs.ai</h1>
        <div className="space-x-2 mt-4">
          <Link className={buttonVariants({ variant: "default" })} href="/sign-in">
            Sign In
          </Link>
          <Link className={buttonVariants({ variant: "default" })} href="/sign-up">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Home;