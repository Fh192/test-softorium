import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { auth } from '../../api/auth';
import { SigninData, SignupData } from '../../types/auth';
import { ErrorResponse } from '../../types/common';
import { setProfile } from './profileReducer';

const initialState = {
  isAuth: false,
  access_token: localStorage.getItem('access_token') || '',
  error: null as null | string,
};

export const signin = createAsyncThunk<
  string,
  SigninData,
  { rejectValue: string }
>('auth/signin', async (signinData, { rejectWithValue }) => {
  try {
    const { access_token } = await auth.signin(signinData);

    localStorage.setItem('access_token', access_token);

    return access_token;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    if (!error.response) {
      throw err;
    }

    const errorMessage = error.response.data.detail;
    return rejectWithValue(errorMessage);
  }
});

export const signup = createAsyncThunk<
  void,
  SignupData,
  { rejectValue: string }
>('auth/signup', async (signupData, { dispatch, rejectWithValue }) => {
  try {
    const data = await auth.signup(signupData);

    dispatch(setProfile(data));
  } catch (err) {
    interface SignupError {
      detail: Array<{ msg: string }>;
    }
    const error = err as AxiosError<SignupError>;

    if (!error.response) {
      throw err;
    }
    
    const errorMessage = error.response.data.detail[0].msg;
 
    return rejectWithValue(errorMessage);
  }
});

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: b => {
    b.addCase(signin.fulfilled, (state, action) => {
      state.access_token = action.payload;
      state.isAuth = true;
      state.error = null;
    });
    b.addCase(signin.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export const { setIsAuth, setError } = authReducer.actions;
