import { FC, ReactNode } from "react"

import { GoogleOAuthProvider } from '@react-oauth/google';

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="984455791756-elnlak34dhbvvn8e53gbqk49rrq1h8q5.apps.googleusercontent.com">
      <div className='h-screen flex flex-col justify-center items-center' >{children}</div>
    </GoogleOAuthProvider>
  )
}
export default AuthLayout
