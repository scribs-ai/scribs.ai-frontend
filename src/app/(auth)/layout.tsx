import { FC, ReactNode } from "react"

import { GoogleOAuthProvider } from '@react-oauth/google';

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="984455791756-elnlak34dhbvvn8e53gbqk49rrq1h8q5.apps.googleusercontent.com">
      <div className='md:w-3/5 p-10 min-h-screen m-auto bg-white flex flex-col items-center justify-center'>
        {children}
      </div>
    </GoogleOAuthProvider>
  )
}
export default AuthLayout
