import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import AddTeamMember from './AddTeamMember';

export interface Member {
  id?: number;
  name: string;
  role: string;
}

interface MemberTableProps {
  members: Member[];
  onDelete: (id: number | undefined) => void
  onUpdate: (memData: Member) => void
}

const MemberTable: React.FC<MemberTableProps> = ({ members, onDelete, onUpdate }) => {
  return (
    <Table>
      <TableCaption>A list of members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell className=' text-right space-x-4'>
              <Button
                variant="outline"
                size="icon"
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => onDelete(member.id)}
              >
                <Trash2 size={20} />
              </Button>
              <AddTeamMember onSubmit={onUpdate} memberData={member}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border border-blue-200 text-blue-200 hover:bg-blue-300 hover:text-white"
                >
                  <Pencil size={20} />
                </Button>
              </AddTeamMember>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table >
  )
}

export default MemberTable;
