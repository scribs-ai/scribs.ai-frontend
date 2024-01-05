import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import CreateWorkSpaceForm from './CreateWorkspaceForm';
import { Workspace } from './page';
import Image from 'next/image';
import { getSourceUrl } from '@/lib/utils';

interface WorkspaceCardProps {
  data: Workspace;
  onDelete: (id: number) => void;
  onUpdate: (data: Partial<Workspace>) => void
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ data, onDelete, onUpdate }) => {
  return (
    <Card className='w-1/4 p-4 hover:bg-accent'>
      <CardHeader>
        <CardTitle className='font-normal break-words'>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={data.image_url ? getSourceUrl(data.image_url) : ""}
          width={500}
          height={500}
          alt="Workspace image"
        />
      </CardContent>
      <CardFooter className='flex justify-center space-x-3'>
        <Button
          variant="outline"
          size="icon"
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => onDelete(data.id)}
        >
          <Trash2 size={20} />
        </Button>
        <CreateWorkSpaceForm
          workspaceData={{ id: data.id, name: data.name, archived: data.archived, image_url: data.image_url, image: '' }}
          onSubmit={onUpdate}>
          <Button
            variant="outline"
            size="icon"
            className="border border-blue-200 text-blue-200 hover:bg-blue-300 hover:text-white"
          >
            <Pencil size={20} />
          </Button>
        </CreateWorkSpaceForm>
      </CardFooter>
    </Card>
  );
};

export default WorkspaceCard;
