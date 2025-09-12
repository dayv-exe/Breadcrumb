import { useMutation, useQuery } from '@tanstack/react-query';
import { checkUsernameAvailability } from '../../api/username';

export const useUsernameAvailableOnInputChange = (username: string) => useQuery({
  queryKey: ['usernameAvailable', username],
  queryFn: () => checkUsernameAvailability(username),
  enabled: !!username,
  staleTime: 1 * 1000 // 4 mins
})

export const useUsernameAvailableOnSubmit = () => useMutation({
  mutationFn: checkUsernameAvailability
})