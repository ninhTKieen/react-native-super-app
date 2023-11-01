import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IOrderState {
  searchQuery: string;
}

const initialState: IOrderState = {
  searchQuery: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clear: () => initialState,
  },
});

export const orderActions = orderSlice.actions;
export const selectedSearchQuery = (state: any) => state.order.searchQuery;
const orderReducer = orderSlice.reducer;
export default orderReducer;
