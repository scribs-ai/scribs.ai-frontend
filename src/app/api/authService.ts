import axios, { AxiosError, AxiosResponse } from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies;

const BASE_URL: string = 'http://13.58.78.54:3000'

export const SignUpApi = async (props: any): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      email: props.email,
      password: props.password,
      password_confirmation: props.confirmPassword
    });
    return response.data;
  } catch (error) {
    //for testing
    console.error('Error in signUpApi:', error);
    throw error;
  }
};

export const SignInApi = async (props: any): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/sign_in`, {
      user: {
        email: props.email,
        password: props.password
      }
    })
      .then((response) => {
        if (response.data) {
          cookies.set('token', response.data.token, {path:'/', httpOnly: true})
          
        }
        return response.data;
      })
    return response;
  } catch (error) {
    throw error;
  }
}

export const ForgotPasswordApi = async (props: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${BASE_URL}/users/passwords/forgot`, {
      email: props.email
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        throw new Error('Email not found');
      }

      throw new Error('Cannot reset password, please try again');
    }

    throw new Error('An unexpected error occurred');
  }
};

export const ResetPasswordApi = async (props: any): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/passwords/reset`, {
      token: props.token,
      password: props.password
    })
    return response.data;

  } catch (error) {
    throw new Error('An error occured try again')
  }

}