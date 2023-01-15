import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../types/user/userType';

export interface AppState {
  user: IUser | null;
}

const initialState: AppState = {
  user: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login} = appSlice.actions;

export default appSlice;
