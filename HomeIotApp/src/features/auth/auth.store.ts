import { storage } from '@src/common/mmkv.storage';
import { create } from 'zustand';

import { IUserInfo } from './auth.model';

type TAuthStore = {
  currentUser?: IUserInfo;
  isAuth: boolean;
  login: (user: any) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthStore>()((set) => ({
  currentUser: undefined,
  isAuth: false,
  login: (user) =>
    set((state) => ({ ...state, currentUser: user, isAuth: true })),
  logout: () => {
    set((state) => ({ ...state, currentUser: undefined, isAuth: false }));
    storage.clearAll();
  },
}));
