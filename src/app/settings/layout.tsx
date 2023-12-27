
import BackButton from "@/components/BackButton"
import { SidebarNav } from "@/components/settings/SideNav"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "User Settings.",
}

const sidebarNavItems = [
  {
    title: "Profile Settings",
    href: "/settings",
  },
  {
    title: "Notification Settings",
    href: "/settings/notification",
  },
  {
    title: "Privacy Settings",
    href: "/settings/privacy-settings",
  },
  {
    title: "Integrations Settings",
    href: "/settings/integration-settings",
  },
  {
    title: "Language and Accessibility",
    href: "/settings/language-accessibility",
  },
  {
    title: "Usage and Analytics",
    href: "/settings/usage-analytics",
  },
  {
    title: "Security Settings",
    href: "/settings/security-settings",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-row items-center gap-4 ">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div >

    </>
  )
}