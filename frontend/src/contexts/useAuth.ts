import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

export const useAuth = () => {
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        // Optionally, you can verify the token or fetch user details here
      }
    };
    fetchUser();
  }, [accessToken]);

  return { accessToken, refreshToken, setTokens, clearTokens };
};
