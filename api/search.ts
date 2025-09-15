import axiosInstance from '../constants/axios';
import { userSearchDetails } from './models/userSearchDetails';

export const searchUser = async (searchString: string): Promise<{ result: userSearchDetails[], reason: string }> => {
  try {
    const { data } = await axiosInstance.get<{ message: userSearchDetails[] }>(`/search/${searchString}`);
    return { result: data.message, reason: "" }
  } catch (error) {
    console.log("ERROR: ", error)
    return { result: [], reason: "Something went wrong try again" }
  }
};
