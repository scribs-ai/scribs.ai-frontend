import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "@/config";
import { Workspace } from "../workspace/page";

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
