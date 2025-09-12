import { useMutation } from '@tanstack/react-query';
import { getUserDetails } from '../../api/getUserDetails';

export const useGetUserDetails = () => useMutation({
  mutationFn: getUserDetails
})