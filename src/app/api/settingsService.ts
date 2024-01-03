import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { config } from "@/config";

const BASE_URL = `${config.base_url}/settings`;

const cookies = new Cookies();

const token: string | undefined = cookies.get("token");

export const getUserDataApi = async (): Promise<any> => {
  try {
    if (!token) {
      throw new Error("Token not found.");
    }

    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/user_profiles/16`,
      {
        headers: { Authorization: token },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch data.");
  }
};

export const updateUserDataApi = async (
  data: Record<string, any>
): Promise<any> => {
  try {
    if (!token) {
      throw new Error("Token not found.");
    }
    const response: AxiosResponse<any> = await axios.put(
      `${BASE_URL}/user_profiles/16`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to update profile.");
  }
};

export const getUsageAnalyticData = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/user_analytics`,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch data");
  }
};

export const exportDataApi = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/accounts/export_user_data.json`
    );
    return response;
  } catch (error) {
    throw new Error("Unable to export data, try again.");
  }
};

export const deleteUserApi = async () => {
  try {
    const response: AxiosResponse<any> = await axios.delete(
      `${BASE_URL}/accounts/delete_account`,
      {
        headers: { Authorization: token },
      }
    );
    cookies.remove("token", { path: "/" });
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export const integrationsettingApi = async (
  data: Record<string, any>
): Promise<any> => {
  try {
    if (!token) {
      throw new Error("Token not found.");
    }
    const response: AxiosResponse<any> = await axios.post(
      "http://13.58.78.54:3000/google_drive/upload_file",
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to update profile.");
  }
};

export const subscriptionApi = async (data: string): Promise<any> => {
  try {
    if (!token) {
      throw new Error("Token not found.");
    }
    const response: AxiosResponse<any> = await axios.post(
      "http://13.58.78.54:3000/customer_intent",
      { plan: data },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.client_secret;
  } catch (error) {
    throw new Error("Unable to process payment.");
  }
};
