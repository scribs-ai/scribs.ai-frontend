"use client"

import React from 'react'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from './ui/button'

const BackButton = () => {
  const router = useRouter()
  return (
    <Button variant="outline" size="icon" onClick={() => router.push('/dashboard')}>
      <ChevronLeft className="h-6 w-6" />
    </Button>

  )
}

export default BackButton