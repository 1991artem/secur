import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ILogin, IUser} from '../../types/user/userType';

export interface AppState {
  app: ILogin;
  user: IUser;
}

const initialState: AppState = {
  app: {
    email: '',
    token: '',
  },
  user: {
    email: '',
    name: '',
    role: '',
    code: '',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {
      state.app = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.app = initialState.app;
      state.user = initialState.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login, setUser} = appSlice.actions;

export default appSlice;
