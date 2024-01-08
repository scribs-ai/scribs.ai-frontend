"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Workspace } from "./page";

export interface CreateWorkSpaceFormProps {
  onSubmit: (data: Partial<Workspace>) => void;
  workspaceData?: Workspace;
  children: React.ReactElement;
}
const CreateWorkSpaceForm: React.FC<CreateWorkSpaceFormProps> = ({ onSubmit, workspaceData, children }) => {
  const [editedName, setEditedName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null)
  const isEditedMode = !!workspaceData;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (workspaceData) { setEditedName(workspaceData.name) }
  }, [workspaceData])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (isEditedMode) {
      const updatedWorkspace: Workspace = { ...workspaceData!, name, image: imageFile };
      await onSubmit(updatedWorkspace);
    } else {
      await onSubmit({ name, image: imageFile });
    }
    setOpen(false)

  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditedMode ? "Edit Workspace" : "Add New Workspace"}
            </DialogTitle>
            <DialogDescription>
              {isEditedMode ? "Update details to the workspace" : "Enter details to create workspace"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name"
                name="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="col-span-3"
                maxLength={50}
                required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input id="image"
                name="image"
                className="col-span-3"
                type="file"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {isEditedMode ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpaceForm;
