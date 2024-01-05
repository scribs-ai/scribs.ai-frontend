"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createWorkspaceApi, deleteWorkspaceApi, getWorkspacesApi } from '../api/workspaceService';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import CreateWorkSpaceForm, { CreateWorkSpaceFormProps } from './CreateWorkspaceForm';

interface Workspace {
  id: number;
  name: string;
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

  const handleWorkspaceAdd: CreateWorkSpaceFormProps['onSubmit'] = async (name) => {
    try {
      const data = { name: name, archived: true };
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

  return (
    <>
      <div className="text-end">
        <CreateWorkSpaceForm onSubmit={handleWorkspaceAdd} />
      </div>
      <div className="flex flex-wrap justify-start gap-6">
        {workspaces &&
          workspaces.map((data) => (
            <Card className='w-1/4 p-4 hover:bg-accent' key={data.id}>
              <CardHeader>
                <CardTitle className='font-normal break-words'>{data.name}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  size="icon"
                  className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleWokspaceDelete(data.id)}
                >
                  <Trash2 size={20} />
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </>
  );
};

export default WorkspacePage;
