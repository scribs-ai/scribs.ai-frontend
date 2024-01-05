import React from "react";
import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";

import BackButton from "@/components/BackButton";

export interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Workspace",
  description: "manage workspace",
};

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex flex-row items-center gap-4">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Workspace</h2>
            <p className="text-muted-foreground">
              Manage your workspaces here.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        {children}
      </div>
    </>
  );
};

export default WorkspaceLayout;
