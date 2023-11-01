import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAuthState,
  ILoginPayload,
  IToken,
  ITokenNew,
  IUser,
} from '@/features/auth/auth.model';
import {RootState} from '../store';

const initialState: IAuthState = {
  currentUser: undefined,
  isAuth: false,
  accessToken: '',
  encryptedAccessToken: '',
  refreshToken: '',
  fcmToken: '',

  isPendingGetMe: false,
  isPendingLogin: false,
  isPendingRegister: false,
  isError: false,

  loginHistory: {
    accounts: [],
    rememberAccountId: 0,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, _action: PayloadAction<ILoginPayload>) => {
      state.isPendingLogin = true;
    },

    loginSuccess: (state, action: PayloadAction<IToken>) => {
      state.isPendingLogin = false;
      state.isError = false;
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.encryptedAccessToken = action.payload.encryptedAccessToken;

      state.refreshToken = action.payload.refreshToken;
    },

    loginFailed: state => {
      state.isPendingLogin = false;
      state.isError = true;
      state.isAuth = false;
      state.currentUser = undefined;
    },

    setFcmToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },

    getMe: state => {
      state.isPendingGetMe = true;
    },

    getMeSuccess: (state, action: PayloadAction<IUser>) => {
      state.isPendingGetMe = false;
      state.isAuth = true;
      state.currentUser = action.payload;
      state.loginHistory.accounts = state.loginHistory.accounts.map(account => {
        if (account.id === action.payload.id) {
          return {
            ...account,
            imageUrl: action.payload.imageUrl,
            fullName: action.payload.fullName,
            currentUser: action.payload,
          };
        }
        return account;
      });
    },

    getMeFailed: state => {
      state.isPendingGetMe = false;
      state.isAuth = false;
      state.currentUser = undefined;
      state.loginHistory.rememberAccountId = 0;
    },

    logout: state => {
      state.isAuth = false;
      state.currentUser = undefined;
      state.accessToken = '';
      state.accessToken = '';
      state.fcmToken = '';
    },

    newTokens: (state, action: PayloadAction<ITokenNew>) => {
      state.accessToken = action.payload.accessToken;
      state.encryptedAccessToken = action.payload.encryptedAccessToken;
    },

    chooseAccount: (state, action: PayloadAction<number>) => {
      state.loginHistory.rememberAccountId = action.payload;
      const account = state.loginHistory.accounts.find(
        a => a.id === action.payload,
      );
      if (account) {
        state.accessToken = account.accessToken;
        state.encryptedAccessToken = account.encryptedAccessToken;
        state.refreshToken = account.refreshToken;
        state.loginHistory.rememberAccountId = account.id;
        state.currentUser = account.currentUser;
      }

      state.isAuth = true;
    },

    rememberAccount: (state, action: PayloadAction<IToken>) => {
      const isExistAccount = state.loginHistory.accounts.some(
        a => a.id === action.payload.userId,
      );

      if (isExistAccount) {
        state.loginHistory.accounts = state.loginHistory.accounts.map(a => {
          if (a.id === action.payload.userId) {
            return {
              ...a,
              accessToken: action.payload.accessToken,
              encryptedAccessToken: action.payload.encryptedAccessToken,
              refreshToken: action.payload.refreshToken,
            };
          }
          return a;
        });
      } else {
        state.loginHistory.accounts.push({
          id: action.payload.userId,
          accessToken: action.payload.accessToken,
          encryptedAccessToken: action.payload.encryptedAccessToken,
          refreshToken: action.payload.refreshToken,
          emailAddress: action.payload.emailAddress,
        });
      }
    },

    deleteAccount: (state, action: PayloadAction<number>) => {
      state.loginHistory.accounts = state.loginHistory.accounts.filter(
        a => a.id !== action.payload,
      );
      if (state.loginHistory.accounts.length === 0) {
        state.isAuth = false;
        state.currentUser = undefined;
        state.accessToken = '';
        state.refreshToken = '';
        state.encryptedAccessToken = '';
        state.loginHistory.rememberAccountId = 0;
      }
    },
  },
});

export const {logout} = authSlice.actions;

export const authActions = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectPendingGetMe = (state: RootState) =>
  state.auth.isPendingGetMe;
export const selectedAccessToken = (state: RootState) => state.auth.accessToken;
export const selectedEncryptedAccessToken = (state: RootState) =>
  state.auth.encryptedAccessToken;
export const selectFCMToken = (state: RootState) => state.auth.fcmToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectAccounts = (state: RootState) =>
  state.auth.loginHistory.accounts;
export const selectTokens = (state: RootState) => ({
  accessToken: state.auth.accessToken,
  encryptedAccessToken: state.auth.encryptedAccessToken,
  refreshToken: state.auth.refreshToken,
});

export default authSlice.reducer;
