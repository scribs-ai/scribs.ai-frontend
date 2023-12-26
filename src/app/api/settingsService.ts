import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://13.58.78.54:3000/settings";

const cookies = new Cookies();

const token: string | undefined = cookies.get("token");

export const getUserDataApi = async (): Promise<any> => {
  try {
    if (!token) {
      throw new Error("Token not found.");
    }

    const response: AxiosResponse<any> = await axios.get(
      `${BASE_URL}/user_profiles`,
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
      `${BASE_URL}/user_profiles`,
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
      `${BASE_URL}/accounts/export_user_data_to_csv`
    );
    return response;
  } catch (error) {
    throw new Error("Unable to export data, try again.");
  }
};
