import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ILogin, IUser} from '../../types/user/userType';

export interface AppState {
  app: ILogin;
  user: IUser;
}

export const workWithServer = false;

const initialState: AppState = !workWithServer
  ? {
      app: {
        email: 'admin@gmail.com',
        token: '12345678',
      },
      user: {
        email: 'admin@gmail.com',
        name: 'Artem',
        role: 'admin',
        code: '3750000000',
        avatar: '',
      },
    }
  : {
      app: {
        email: '',
        token: '',
      },
      user: {
        email: '',
        name: '',
        role: '',
        code: '',
        avatar: '',
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
