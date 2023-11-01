import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProfileSettings} from './profile.model';

const initialState: IProfileSettings = {
  language: 'vi',
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    resetCurrentLanguage: state => {
      state.language = 'vi';
    },
  },
});
// export const storeActions = storeSlice.actions;
export const selectCurrentStore = (state: any) => state.settings.language;
export const {setCurrentLanguage, resetCurrentLanguage} = settingSlice.actions;

export default settingSlice.reducer;
