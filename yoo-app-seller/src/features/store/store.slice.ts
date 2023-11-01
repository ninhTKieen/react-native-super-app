import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IStore, IStoreStatus} from './store.model';
import {RootState} from '../store';

const initialState: IStoreStatus = {
  currentStore: undefined,
  currentStoreInfor: undefined,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setCurrentStore: (state, action: PayloadAction<IStore>) => {
      state.currentStore = action.payload.id;
      state.currentStoreInfor = action.payload;
    },
    resetCurrentStore: state => {
      state.currentStore = undefined;
      state.currentStoreInfor = undefined;
    },
  },
});
// export const storeActions = storeSlice.actions;
export const selectCurrentStore = (state: RootState) =>
  state.store.currentStore;
export const selectCurrentStoreInfor = (state: RootState) =>
  state.store.currentStoreInfor;
export const {setCurrentStore, resetCurrentStore} = storeSlice.actions;

export default storeSlice.reducer;
