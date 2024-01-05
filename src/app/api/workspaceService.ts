import axios, { Axios, AxiosResponse } from "axios";
import { config } from "@/config";

const BASE_URL: string = `${config.base_url}`;

interface Workspace {
  name: string;
  archived: boolean;
}

export const getWorkspacesApi = async (): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/workspaces`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch workspaces, try again!");
  }
};

export const createWorkspaceApi = async (
  workspaceData: Workspace
): Promise<Workspace> => {
  try {
    const response: AxiosResponse<Workspace> = await axios.post<Workspace>(
      `${BASE_URL}/workspaces`,
      workspaceData
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
