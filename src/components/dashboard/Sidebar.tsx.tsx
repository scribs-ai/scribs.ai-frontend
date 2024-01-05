import React from 'react'
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'

export function Sidebar({ className }: any) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Link
              href={'/workspace'}
              className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start")}
            >
              Workspace Management
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              AI Editor
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Knowledge
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Chat Bot
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              AI Generators
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Workflows
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Guide
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Promotions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Limits
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Account settings
            </Button>
            <Link
              href={'/settings'}
              className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start")}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

