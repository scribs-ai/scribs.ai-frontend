import axios from "axios"


const BASE_URL: string = "https://9640-223-236-73-78.ngrok-free.app/"

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