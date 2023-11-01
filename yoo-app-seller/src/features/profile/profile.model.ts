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

export interface IUpdateProfilePayload {
  name?: string;
  surname?: string;
  userName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  homeAddress?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  imageUrl?: string;
}

export interface IUpdateProfilePicturePayload {
  imageUrl: string;
}

export interface IProfileSettings {
  language: string;
}

export interface IChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
