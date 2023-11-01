import {
  authActions,
  selectRefreshToken,
  selectedAccessToken,
  selectedEncryptedAccessToken,
} from '@/features/auth/auth.slice';
import {useAppDispatch, useAppSelector} from './redux.hook';

export const useToken = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectedAccessToken);
  const refreshToken = useAppSelector(selectRefreshToken);
  const encryptedAccessToken = useAppSelector(selectedEncryptedAccessToken);

  const setToken = ({at, et}: {at: string; et: string}) => {
    dispatch(
      authActions.newTokens({accessToken: at, encryptedAccessToken: et}),
    );
  };
  return {accessToken, refreshToken, encryptedAccessToken, setToken};
};
