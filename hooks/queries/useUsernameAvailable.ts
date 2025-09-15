import { useMutation, useQuery } from '@tanstack/react-query';
import { checkUsernameAvailability } from '../../api/username';

export const useUsernameAvailableOnInputChange = (username: string) => useQuery({
  queryKey: ['usernameAvailable', username],
  queryFn: () => checkUsernameAvailability(username),
  enabled: !!username,
  staleTime: 60 * 1000 // un minuto
})

export const useUsernameAvailableOnSubmit = () => useMutation({
  mutationFn: checkUsernameAvailability
})