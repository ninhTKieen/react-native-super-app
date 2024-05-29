export interface IAuthState {
  currentUser?: any;
  isLoggedIn: boolean;
}

export interface ILoginPayload {
  tenancyName?: string;
  userNameOrEmailAddress: string;
  password: string;
  rememberClient?: boolean;
}

export interface IRegisterPayload {
  tenantId?: number | null;
  username: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  fullName?: string;
  isCitizen?: boolean;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: Date;
  thirdAccount?: any;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
}

export interface IUserInfo {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: string;
  fullName: string;
  phoneNumber: string;
  lastLoginTime: any;
  creationTime: Date;
  roleNames: any;
  homeAddress: string;
  addressOfBirth: any;
  dateOfBirth: Date;
  gender: string;
  nationality: any;
  profilePictureId: any;
  imageUrl: string;
  coverImageUrl: any;
  identityNumber: any;
  id: number;
  permissions: any[];
  roles: any[];
}

export enum TenantState {
  Available = 1,
  NotFound = 3,
}

export interface IIsTenantAvailableResponse {
  adminPageConfig: string | null;
  mobileConfig: string | null;
  permissions: string | null;
  state: TenantState;
  tenantId: number | null;
}

export enum EAppType {
  HOME_IOT = 'HOME_IOT',
}

export interface IPostFcmToken {
  token: string;
  appType: EAppType;
}
