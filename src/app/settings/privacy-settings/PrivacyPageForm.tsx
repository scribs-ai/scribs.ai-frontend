"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

import Link from "next/link"

import { exportDataApi } from "@/app/api/settingsService"

const PrivacyFormPage: React.FC = () => {

  const handleExport = async () => {
    exportDataApi()
      .then((res) => {
        toast({
          title: "File downloaded successfully"
        })
      })
      .catch((err) => {
        toast({
          title: err.message
        })
      })
  }

  return (
    <>
      <h3 className="mb-4 text-lg font-medium">Privacy Settings</h3>
      <Separator />
      <div className=" mt-5 space-y-3">

        <div className="flex items-center justify-between rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Export account data</h3>
          <Button onClick={handleExport}>export</Button>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="text-lg font-semibold">Privacy Policy Page</h3>
            <p>Click the button to read our policies.</p>
          </div>
          <Link className={buttonVariants({ variant: "outline" })} href={'/privacy-policy'}>Privacy</Link>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h3 className="text-lg font-semibold">Terms and Conditions</h3>
            <p>Click the button to read our t&cs.</p>
          </div>
          <Link className={buttonVariants({ variant: "outline" })} href={'/terms-condition'}>Terms & conditions</Link>
        </div>

      </div>
    </>
  )
}

export default PrivacyFormPage;
