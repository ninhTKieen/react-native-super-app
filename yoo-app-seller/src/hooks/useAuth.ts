import {useAppSelector, useAppDispatch} from './redux.hook';
import {useQuery} from '@tanstack/react-query';

import {
  selectCurrentUser,
  selectIsAuth,
  selectPendingGetMe,
  authActions,
  selectedAccessToken,
} from '@/features/auth/auth.slice';
import authServices from '@/features/auth/auth.services';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectCurrentUser);
  const isPendingGetMe = useAppSelector(selectPendingGetMe);
  const accessToken = useAppSelector(selectedAccessToken);

  useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authServices.getUserInfo(),
    onSuccess: data => {
      dispatch(authActions.getMeSuccess(data));
    },
    onError: () => {
      dispatch(authActions.getMeFailed());
    },
    enabled: !!accessToken,
  });

  return {isAuth, currentUser, isPendingGetMe};
};
