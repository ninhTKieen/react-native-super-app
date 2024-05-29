import { create } from 'zustand';

import { IGetOneHomeResponse } from './home.model';

type THomeStore = {
  currentHome?: IGetOneHomeResponse;
  setCurrentHome: (home: IGetOneHomeResponse) => void;
  clearCurrentHome: () => void;
};

export const useHomeStore = create<THomeStore>((set) => ({
  currentHome: undefined,
  setCurrentHome: (home) => set({ currentHome: home }),
  clearCurrentHome: () => set({ currentHome: undefined }),
}));
