"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { ArrowLeftCircle } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()
  return (
    <ArrowLeftCircle onClick={() => router.push('/dashboard')} />

  )
}

export default BackButton