import { FRIENDSHIP_ACTIONS } from '@/constants/appConstants';
import { AxiosError } from 'axios';
import axiosInstance from '../constants/axios';
import { UserDetails } from './models/userDetails';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface friendshipActionRes {
  message: string | null
  error?: string
}

interface friendsRes {
  users: UserDetails[] | null
  error?: string
}

const friendshipAction = async (action: string, payload: string): Promise<friendshipActionRes> => {
  try {
    const { data } = await axiosInstance.get<{ message: string }>(`/friendship/${action}/${payload}`);
    return { message: data.message }
  } catch (error) {
    const axiosError = error as AxiosError
    const status = axiosError.response?.status
    if (status === 404) {
      return { message: null, error: "User not found!" }
    }
    return { message: null, error: axiosError.message ?? "An error occurred" }
  }
};

const getFriends = async (action: FRIENDSHIP_ACTIONS): Promise<friendsRes> => {
  try {
    const { data } = await axiosInstance.get<{ message: UserDetails[] }>(`/friendship/${action}/0`);  // url has to contain that 0 because the url structure on the backend requires an action and payload
    return { users: data.message }
  } catch (error) {
    return { users: null, error: "Something went wrong try again." }
  }
}

export const getAllFriends = async (): Promise<friendsRes> => {
  return getFriends(FRIENDSHIP_ACTIONS.GET_FRIENDS)
}

export const getAllFriendRequests = async (): Promise<friendsRes> => {
  return getFriends(FRIENDSHIP_ACTIONS.GET_REQUESTS)
}

export const sendFriendRequest = async (recipientId: string): Promise<friendshipActionRes> => {
  return friendshipAction(FRIENDSHIP_ACTIONS.REQUEST, recipientId)
};

export const cancelFriendRequest = async (recipientId: string): Promise<friendshipActionRes> => {
  return friendshipAction(FRIENDSHIP_ACTIONS.CANCEL_REQUEST, recipientId)
};

export const acceptFriendRequest = async (recipientId: string): Promise<friendshipActionRes> => {
  return friendshipAction(FRIENDSHIP_ACTIONS.ACCEPT, recipientId)
};

export const rejectFriendRequest = async (recipientId: string): Promise<friendshipActionRes> => {
  return friendshipAction(FRIENDSHIP_ACTIONS.REJECT, recipientId)
};

export const endFriendship = async (recipientId: string): Promise<friendshipActionRes> => {
  return friendshipAction(FRIENDSHIP_ACTIONS.END, recipientId)
};
