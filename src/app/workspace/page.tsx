"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createWorkspaceApi, deleteWorkspaceApi, getWorkspacesApi, updateWorkspaceApi } from '../api/workspaceService';
import { toast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';
import CreateWorkSpaceForm, { CreateWorkSpaceFormProps } from './CreateWorkspaceForm';
import WorkspaceCard from './WorkspaceCard';

export interface Workspace {
  id: number;
  name: string;
  archived: boolean;
  image_url: any | null;
  image: any
}

const WorkspacePage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[] | null>(null);

  const fetchWorkspace = async () => {
    try {
      const response = await getWorkspacesApi();
      setWorkspaces(response.data);
    } catch (error: any) {
      toast({
        title: error.message
      });
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, []);

  const handleWorkspaceAdd = async (data: Partial<Workspace>) => {
    try {
      const response = await createWorkspaceApi(data);
      if (response) {
        fetchWorkspace();
        toast({
          title: "Workspace created"
        });
      }
    } catch (error: any) {
      toast({
        title: error.message
      });
    }
  };

  const handleWokspaceDelete = async (id: number) => {
    try {
      const response = await deleteWorkspaceApi(id);
      toast({
        title: response
      });
      fetchWorkspace();
    } catch (error: any) {
      toast({
        title: error.message
      });
    }
  };

  const handleWorkspaceUpdate = async (data: Partial<Workspace>) => {
    try {
      const response = await updateWorkspaceApi(data)
      if (response) {
        fetchWorkspace()
        toast({
          title: "Workspace updated Successfully."
        })
      }
    } catch (error: any) {
      toast({
        title: error.message
      })
    }
  }

  return (
    <>
      <div className="text-end">
        <CreateWorkSpaceForm onSubmit={handleWorkspaceAdd}>
          <Button variant="outline" className="hover:bg-blue-200">
            <Plus />
            Add New Workspace
          </Button>
        </CreateWorkSpaceForm>
      </div>
      <div className="flex flex-wrap justify-start gap-6">
        {workspaces &&
          workspaces.map((data) => (
            <WorkspaceCard
              key={data.id}
              data={data}
              onDelete={handleWokspaceDelete}
              onUpdate={handleWorkspaceUpdate}
            />
          ))
        }
      </div>
    </>
  );
};

export default WorkspacePage;
