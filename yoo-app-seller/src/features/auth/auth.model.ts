export interface IUser {
  id: number;
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  phoneNumber?: string;
  lastLoginTime?: string;
  creationTime: string;
  roleNames?: any;
  homeAddress?: any;
  addressOfBirth?: any;
  dateOfBirth?: any;
  gender?: any;
  nationality?: any;
  profilePictureId?: any;
  imageUrl?: any;
  phanKhuId?: any;
  houseId?: any;
  identityNumber?: any;
  qrCodeBase64?: any;
  stateFriend?: number;
}

export interface ILoginPayload {
  userNameOrEmailAddress: string;
  password: string;
}
export interface IForgetPassPayload {
  email: string;
}

export interface IToken {
  accessToken: string;
  encryptedAccessToken: string;
  refreshToken: string;
  emailAddress: string;
  userId: number;
}

export interface IAuthenticateResponse {
  accessToken: string;
  encryptedAccessToken: string;
  refreshToken: string;
  emailAddress: string;
  userId: number;
}

export interface IRegisterPayload {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  password: string;
  tenantId: number;
  confirmPassword: string;
  confirmPolicy: boolean;
}

export interface IAuthState {
  currentUser?: IUser;
  isAuth: boolean;
  accessToken: string;
  encryptedAccessToken: string;
  fcmToken: string;
  refreshToken: string;

  isPendingGetMe: boolean;
  isPendingLogin: boolean;
  isPendingRegister: boolean;
  isError: boolean;

  loginHistory: ILoginHistory;
}

export interface ICheckTenantAvailableRequest {
  tenancyName: string;
}

export interface ICheckTenantAvailableResponse {
  tenantId: number;
  mobileConfig: string;
  adminPageConfig: string;
  permissions: string;
  state: number;
}

export interface IAccount {
  id: number;
  imageUrl?: string;
  fullName?: string;
  currentUser?: IUser;
  emailAddress: string;
  accessToken: string;
  encryptedAccessToken: string;
  refreshToken: string;
}

export interface ILoginHistory {
  accounts: IAccount[];
  rememberAccountId: number;
}

export interface ITokenNew {
  accessToken: string;
  encryptedAccessToken: string;
}
