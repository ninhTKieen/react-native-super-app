import { create } from 'zustand';

import { EDeviceType } from '../devices/device.model';

type TCreateMomentAction = {
  index: number;
  deviceId?: string;
  attribute?: string;
  ep?: string;
  value?: string;
  delay: number | null;
  doAutomationSceneId?: number;
  doAutomationSceneEnabled?: boolean;
  doMomentSceneId?: number;
  label?: string;
  deviceType?: EDeviceType;
};

type TSceneStore = {
  createMomentActions?: TCreateMomentAction[];
  setCreateMomentAction: (actions: TCreateMomentAction[]) => void;
  clearCreateMomentAction: () => void;
};

export const useSceneStore = create<TSceneStore>((set) => ({
  createMomentActions: undefined,
  setCreateMomentAction: (actions) =>
    set((state) => ({
      createMomentActions: [...(state.createMomentActions || []), ...actions],
    })),
  clearCreateMomentAction: () => set({ createMomentActions: undefined }),
}));
