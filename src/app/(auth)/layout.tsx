import { FC, ReactNode } from "react"

import { Toaster } from "@/components/ui/toaster"

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <div >{children}</div>
      <Toaster />
    </>

  )
}
export default AuthLayout