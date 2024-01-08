import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "@/config";
import { Workspace } from "../workspace/page";
import { Member } from "../workspace/[workspace_id]/MemberTable";

const BASE_URL: string = `${config.base_url}`;

export const getWorkspacesApi = async (): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/workspaces`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch workspaces, try again!");
  }
};

export const createWorkspaceApi = async (
  workspaceData: Partial<Workspace>
): Promise<Workspace> => {
  try {
    const response: AxiosResponse<Workspace> = await axios.post<Workspace>(
      `${BASE_URL}/workspaces`,
      { workspace: { ...workspaceData, archived: false } },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create workspace, please try again!");
  }
};

export const deleteWorkspaceApi = async (id: number): Promise<string> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.delete<{
      message: string;
    }>(`${BASE_URL}/workspaces/${id}`);
    return response.data.message;
  } catch (error) {
    throw new Error("Failed to delete workspace, please try again!");
  }
};

export const updateWorkspaceApi = async (
  workspaceData: Partial<Workspace>
): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.put(
      `${BASE_URL}/workspaces/${workspaceData.id}`,
      { workspace: { ...workspaceData, archived: false } },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error("Workspace not found");
      }
    }
    throw new Error("Some error occurred, try again.");
  }
};

export const getTeamMembers = async (workspace_id: number) => {
  try {
    const response = axios.get(
      `${BASE_URL}/workspaces/${workspace_id}/team_members`
    );
    return response;
  } catch (error) {
    throw new Error("Unable to fetch data");
  }
};

export const addTeamMember = async (
  workspace_id: number,
  name: string,
  role: string
) => {
  try {
    const response = axios.post(
      `${BASE_URL}/workspaces/${workspace_id}/team_members`,
      {
        team_member: {
          name,
          role,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("unable to add member");
  }
};

export const deleteTeamMember = async (
  workspace_id: number,
  memberId: number | undefined
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/workspaces/${workspace_id}/team_members/${memberId}`
    );
    return response;
  } catch (error) {
    throw new Error("Unable to remove member.");
  }
};

export const updateTeamMemberApi = async (
  workspace_id: number,
  memberData: Member
) => {
  try {
    const { id, name, role } = memberData;
    const response = await axios.put(
      `${BASE_URL}/workspaces/${workspace_id}/team_members/${id}`,
      { team_member: { name: name, role: role } }
    );
    return response;
  } catch (error) {
    throw new Error("Unable to update member.");
  }
};

export const uploadWorkspaceFileApi = async (
  workspace_id: number,
  file: File | null
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/workspaces/${workspace_id}/upload_workspace_data_s3`,
      { workspace: { image: file } },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Unable to upload file, try again.");
  }
};
