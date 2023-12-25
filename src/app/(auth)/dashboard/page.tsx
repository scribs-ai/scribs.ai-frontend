import Mainarea from "@/components/dashboard/Mainarea"
import { Sidebar } from "@/components/dashboard/Sidebar.tsx"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Scribs.ai",
}

export default function Dashboard() {
  return (
    <>
      <div className="hidden md:block">

        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Mainarea />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}