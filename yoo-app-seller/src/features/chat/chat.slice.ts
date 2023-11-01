import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IChatState} from '@/features/chat/chat.model';
import {RootState} from '../store';

const initialState: IChatState = {
  hubSignalR: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConnection: (state, _action: PayloadAction<signalR.HubConnection>) => {
      state.hubSignalR = _action.payload;
    },
  },
});
export const selecthubSignalR = (state: RootState) => state.chat.hubSignalR;

export const {setConnection} = chatSlice.actions;
export default chatSlice.reducer;
