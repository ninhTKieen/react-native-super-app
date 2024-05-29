import { useAppStore } from '@src/features/app/app.store';
import authService from '@src/features/auth/auth.service';
import { useAuthStore } from '@src/features/auth/auth.store';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useAuth = () => {
  const { isAuth, currentUser, login, logout } = useAuthStore();
  const { setLoading } = useAppStore();

  const getUserInfo = useCallback(async () => {
    try {
      const userInfo = await authService.getUserInfo();
      login(userInfo);
      setLoading(false);

      return userInfo;
    } catch (error) {
      logout();
      setLoading(false);

      return null;
    }
  }, [login, logout, setLoading]);

  const authQuery = useQuery({
    queryKey: ['auth/getUserInfo'],
    queryFn: () => getUserInfo(),
  });

  return { authQuery, isAuth, currentUser };
};
