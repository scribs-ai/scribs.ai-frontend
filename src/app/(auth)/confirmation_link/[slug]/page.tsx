"use client"
import React from 'react'

import UserVerification from '@/components/form/UserVerification';

const page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <UserVerification token={slug} />

}

export default page