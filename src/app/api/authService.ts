import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const BASE_URL: string = "http://13.58.78.54:3000";

export const signUpApi = async (props: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<any> => {
  const { email, password, confirmPassword } = props;

  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      email,
      password,
      password_confirmation: confirmPassword,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 422) {
        throw new Error("Email already exists. Please Login!");
      } else {
        throw new Error("Cannot create account, please try again");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const signInApi = async (props: {
  email: string;
  password: string;
}): Promise<string | undefined> => {
  try {
    const signInResponse = await axios.post(`${BASE_URL}/users/sign_in`, {
      user: {
        email: props.email,
        password: props.password,
      },
    });

    if (signInResponse.status === 200) {
      localStorage.setItem("email", props.email);

      const otpGenerateResponse = await axios.get(
        `${BASE_URL}/users/registrations/generate_otp`,
        {
          params: { email: props.email },
        }
      );

      if (otpGenerateResponse.status === 200) {
        return signInResponse.data;
      } else {
        throw new Error("Failed to generate OTP");
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        throw new Error("Email not found");
      }

      if (axiosError.response?.status === 401) {
        throw new Error("Wrong email or password");
      }
    }
    throw new Error("Sign-in failed");
  }
};

export const ForgotPasswordApi = async (props: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/users/passwords/forgot`,
      {
        email: props.email,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        throw new Error("Email not found");
      }

      throw new Error("Cannot reset password, please try again");
    }

    throw new Error("An unexpected error occurred");
  }
};

export const ResetPasswordApi = async (props: any): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/passwords/reset`, {
      token: props.token,
      password: props.password,
    });
    return response.data;
  } catch (error) {
    throw new Error("An error occured try again");
  }
};

export const TwoFactorAuthApi = async (props: any): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/sessions/otp_login`, {
      email: localStorage.getItem("email"),
      otp_secret: props.otp,
    });
    if (response.status === 200) {
      localStorage.removeItem("email");
      cookies.set("token", response.data.token, { path: "/", httpOnly: true });
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        throw new Error("Invalid OTP");
      }

      throw new Error("Cannot verify OTP, please try again");
    }

    throw new Error("An unexpected error occurred");
  }
};
