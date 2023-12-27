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

export const userVerificationApi = async (props: {
  token: string;
}): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/confirmation`, {
      params: {
        confirmation_token: props.token,
      },
    });
    if (response.status === 200) {
      cookies.set("token", response.data.token, { path: "/", httpOnly: true });
      return response.data;
    }
  } catch (error) {
    throw new Error("An unexpected error occurred");
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
        if (
          (axiosError.response?.data as any)?.message === "Please confirm email"
        ) {
          throw new Error("Email is not verified.");
        } else {
          throw new Error("Wrong email or password");
        }
      }
    }
    throw new Error("Sign-in failed");
  }
};

export const forgotPasswordApi = async (props: {
  email: string;
}): Promise<any> => {
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
        throw new Error(
          "Email not found. Please check the email address provided."
        );
      }

      throw new Error(
        "Failed to initiate password reset. Please try again later."
      );
    }

    throw new Error("An unexpected error occurred");
  }
};

export const resetPasswordApi = async (props: {
  token: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/passwords/reset`, {
      token: props.token,
      password: props.password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        throw new Error("Invalid link or link expired.");
      } else {
        throw new Error("Failed to reset password. Please try again later.");
      }
    }

    throw new Error("An unexpected error occurred");
  }
};

export const twoFactorAuthApi = async (props: {
  otp: string;
}): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/sessions/otp_login`, {
      email: localStorage.getItem("email"),
      otp_secret: props.otp,
    });
    if (response.status === 200) {
      localStorage.removeItem("email");
      cookies.set("token", response.data.token, { path: "/" });
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        throw new Error("Invalid OTP. Please enter a valid OTP.");
      }

      throw new Error("Cannot verify OTP, please try again");
    }

    throw new Error("An unexpected error occurred");
  }
};

export const googleOauthApi = async (props: {
  access_token: string;
}): Promise<string | undefined> => {
  try {
    const googleOauthResponse = await axios.post(
      `${BASE_URL}/users/registrations/google_oauth`,
      { access_token: `Bearer ${props.access_token}` }
    );

    if (googleOauthResponse.status === 200) {
      cookies.set("token", googleOauthResponse.data.token, {
        path: "/",
        httpOnly: true,
      });
      return googleOauthResponse.data;
    }
  } catch (error: any) {
    throw new Error("Please try again.");
  }
};

export const signOutApi = async (): Promise<string> => {
  const token: string | undefined = cookies.get("token");

  try {
    const response = await axios.delete(`${BASE_URL}/users/sign_out`, {
      headers: { Authorization: token },
    });
    cookies.remove("token", { path: "/" });
    return "Logout Successfully";
  } catch (error: any) {
    return error.message;
  }
};
