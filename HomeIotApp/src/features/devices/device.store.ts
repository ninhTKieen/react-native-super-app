import { create } from 'zustand';

import { TDeviceProfile } from './device.model';

type TDeviceStore = {
  profile?: TDeviceProfile;

  setProfile: (profile: TDeviceProfile) => void;
};

export const useDeviceStore = create<TDeviceStore>((set) => ({
  profile: undefined,
  setProfile: (profile) => set((state) => ({ ...state, profile })),
}));
