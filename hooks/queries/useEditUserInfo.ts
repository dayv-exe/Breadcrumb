import { useMutation } from '@tanstack/react-query';
import { editUserInfo } from '../../api/editUserInfo';

export const useAbortSignup = () => useMutation({
  mutationFn: editUserInfo
})