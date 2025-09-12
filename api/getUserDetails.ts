import { AxiosError } from 'axios';
import axiosInstance from '../constants/axios';
import { UserDetails } from './models/userDetails';

export interface UserDetailsResponse {
  user: UserDetails | null
  error?: string
}

export const getUserDetails = async (nickname: string): Promise<UserDetailsResponse> => {
  try {
    const { data } = await axiosInstance.get<{message: UserDetails}>(`/user/${nickname}`)
    return{user: data.message}
  } catch (error) {
    const axiosError = error as AxiosError
    const status = axiosError.response?.status
    console.error("failed to get user details:", status, axiosError.response?.data)
    if (status === 404){
      return {user: null, error: "User not found!"}
    } 
    return { user: null, error: axiosError.message ?? "An error occurred while try to get user." }
  }
}
