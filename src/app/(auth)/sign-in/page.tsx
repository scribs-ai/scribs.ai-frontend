import React from 'react'

import SignInForm from '@/components/auth-forms/SignInForm'
import SignInPage from './SignInPage'

const page = () => {
  return (
    <div className='w-3/5'>
      <h1 className='text-3xl font-bold mb-12 text-left'>Login</h1>
      <SignInForm />
    </div>)


}
export default page