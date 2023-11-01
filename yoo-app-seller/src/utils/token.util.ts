import {
  ACCESS_TOKEN_KEY,
  ACCOUNT_DATA_KEY,
  ENCRYPTED_ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/configs/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import axios from 'axios';
import {ILoginHistory, IAuthenticateResponse} from '@/features/auth/auth.model';
interface REFRESH_TOKEN_RESPONSE {
  newAccessToken: string;
  encryptedAccessToken: string;
}

interface SAVE_TOKENS_PARAMS {
  accessToken: string;
  encryptedAccessToken: string;
  refreshToken: string;
}

export const getToken = async () =>
  await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

export const setToken = async (token: string) =>
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);

export const removeToken = async () =>
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

export const isTokenExpired = (token: string) => {
  const decodedToken: JwtPayload = jwt_decode(token);
  if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
    return true; // Token expired
  }
  return false; // Token not expired
};

export const getNewAccessToken = async (
  refreshToken: string,
): Promise<REFRESH_TOKEN_RESPONSE> => {
  const url = `http://103.229.41.59:800/api/TokenAuth/RefreshToken?refreshToken=${refreshToken}`;
  const {accessToken, encryptedAccessToken} = (await axios.post(url)).data
    .result;
  const newAccessToken = accessToken;
  return {newAccessToken, encryptedAccessToken};
};

export const saveTokens = async ({
  accessToken,
  encryptedAccessToken,
  refreshToken,
}: SAVE_TOKENS_PARAMS) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(ENCRYPTED_ACCESS_TOKEN_KEY, encryptedAccessToken);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const saveNewLoginHistory = async (data: IAuthenticateResponse) => {
  let loginHistory = await AsyncStorage.getItem(ACCOUNT_DATA_KEY);
  if (loginHistory) {
    const temp: ILoginHistory = JSON.parse(loginHistory);
    temp.accounts.push({
      id: data.userId,
      emailAddress: data.emailAddress,
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
      encryptedAccessToken: data.encryptedAccessToken,
    });
    await AsyncStorage.setItem(ACCOUNT_DATA_KEY, JSON.stringify(temp));
  } else {
    const temp: ILoginHistory = {
      rememberAccountId: data.userId,
      accounts: [
        {
          id: data.userId,
          emailAddress: data.emailAddress,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          encryptedAccessToken: data.encryptedAccessToken,
        },
      ],
    };
    await AsyncStorage.setItem(ACCOUNT_DATA_KEY, JSON.stringify(temp));
  }
};
