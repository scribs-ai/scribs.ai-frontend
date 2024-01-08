"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Member } from './MemberTable';

interface AddTeamMemberProps {
  onSubmit: (data: Member) => void;
  children: React.ReactNode;
  memberData?: Member
}

const AddTeamMember: React.FC<AddTeamMemberProps> = ({ children, onSubmit, memberData }) => {
  const [formData, setFormData] = useState<Member>({
    id: undefined,
    name: '',
    role: '',
  });
  const [open, setOpen] = useState(false);
  const isEditedMode = !memberData

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', role: '' });
  };
  useEffect(() => {
    if (memberData) {
      setFormData({ id: memberData.id, name: memberData.name, role: memberData.role })
    }
  }, [memberData])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {!isEditedMode ? "Update member" : "Add new team member"}
            </DialogTitle>
            <DialogDescription>
              {!isEditedMode ? "modify the details to update team member" : "Enter details to add new member"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                name="name"
                className="col-span-3"
                maxLength={50}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                name="role"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{!isEditedMode ? "Update" : "Add"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMember;
