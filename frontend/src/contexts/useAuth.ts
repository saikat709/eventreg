import { useAuthStore } from './auth.store';

export const useAuth = () => {
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore();

  // TODO: Add useEffect to fetch user data

  return { accessToken, refreshToken, setTokens, clearTokens };
};
