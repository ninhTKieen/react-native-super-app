import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemCategoryNode} from './item.model';
interface ICreateItemState {
  category: {
    id: number;
    name: string;
  } | null;
  attributeList: Array<{
    id: string | number;
    unitList: Array<string>;
    valueList: Array<string>;
  }>;
  categoryNodes: Array<ItemCategoryNode>;
}

const initialState: ICreateItemState = {
  category: null,
  attributeList: [],
  categoryNodes: [],
};

const createItemSlice = createSlice({
  name: 'createItem',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<{id: number; name: string}>) => {
      state.category = action.payload;
    },

    setAttribute: (state, action: PayloadAction<Array<any>>) => {
      state.attributeList = action.payload;
    },

    setCategoryNodes: (
      state,
      action: PayloadAction<Array<ItemCategoryNode>>,
    ) => {
      state.categoryNodes = action.payload;
    },

    clear: () => initialState,
  },
});

export const createItemActions = createItemSlice.actions;

export const selectedCategory = (state: any) => state.createItem.category;
export const selectedAttributeList = (state: any) =>
  state.createItem.attributeList;
export const selectedCategoryNodes = (state: any) =>
  state.createItem.categoryNodes;

const createItemReducer = createItemSlice.reducer;
export default createItemReducer;
