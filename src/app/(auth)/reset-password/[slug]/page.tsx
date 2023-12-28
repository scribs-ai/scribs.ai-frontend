import React from 'react'
import ResetPasswordForm from '@/components/auth-forms/ResetPasswordForm';

const page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <ResetPasswordForm token={slug} />
}

export default page