'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Plus, Upload } from 'lucide-react';
import {
  addTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMemberApi,
  uploadWorkspaceFileApi
} from '@/app/api/workspaceService';
import MemberTable, { Member } from './MemberTable';
import AddTeamMember from './AddTeamMember';
import UploadDialog from './UploadDialog';

interface PageProps {
  params: {
    workspace_id: number;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { workspace_id } = params;
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  const getAllTeamMembers = async () => {
    try {
      const response = await getTeamMembers(workspace_id);
      setTeamMembers(response.data);
    } catch (error: any) {
      toast({
        title: error.message
      });
    }
  };

  useEffect(() => {
    getAllTeamMembers();
  }, [workspace_id]);

  const handleAddMember = async (data: Member) => {
    try {
      const { name, role } = data;
      const response = await addTeamMember(workspace_id, name, role);
      if (response) {
        toast({
          title: 'Team Member added'
        });
        getAllTeamMembers();
      }
    } catch (error: any) {
      toast({
        title: error.message
      });
    }
  };

  const removeTeamMember = async (member_id: number | undefined) => {
    try {
      const response = await deleteTeamMember(workspace_id, member_id);
      if (response) {
        toast({
          title: 'Member removed successfully.'
        });
      }
      getAllTeamMembers();
    } catch (error) {
      toast({
        title: 'Unable to remove member, try again.'
      });
    }
  };

  const updateTeamMember = async (memberData: Member) => {
    try {
      const response = await updateTeamMemberApi(workspace_id, memberData);
      if (response) {
        toast({
          title: 'Data updated successfully'
        });
      }
      getAllTeamMembers();
    } catch (error: any) {
      toast({
        title: error.message
      });
    }
  };

  const uploadWorkspaceFile = async (file: File | null) => {
    try {
      const response = await uploadWorkspaceFileApi(workspace_id, file);
      if (response) {
        toast({
          title: 'File uploaded successfully.'
        });
      }
    } catch (error: any) {
      toast({
        title: error.message
      });
    }
  };

  return (
    <div className="flex space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/5 border-r border-grey-500">
        Workspace Name
      </aside>
      <div className="flex-1 lg:max-w-2xl space-y-6">
        <MemberTable members={teamMembers} onDelete={removeTeamMember} onUpdate={updateTeamMember} />
      </div>
      <div>
        <AddTeamMember onSubmit={handleAddMember}>
          <Button variant="outline" className="hover:bg-blue-200">
            <Plus />
            Add Team Member
          </Button>
        </AddTeamMember>
        <UploadDialog onUpload={uploadWorkspaceFile}>
          <Button variant="outline" className="mx-2 hover:bg-blue-200">
            <Upload />{' '}
            Upload
          </Button>
        </UploadDialog>
      </div>
    </div>
  );
};

export default Page;
