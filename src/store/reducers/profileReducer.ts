import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '..';
import { profile } from '../../api/profile';
import { IErrorResponse } from '../../types/common';
import { IProfile } from '../../types/profile';

const initialState: IProfile = {
  id: '',
  phone: '',
  name: '',
  email: '',
  birthday: '',
  avatar: '',
  dt_create: '',
  enabled: false,
  time_zone: '',
};

export const getUserProfile = createAsyncThunk<
  IProfile,
  void,
  { state: RootState; rejectValue: string }
>('profile/getUserProfile', async (_, { rejectWithValue, getState }) => {
  try {
    const { access_token } = getState().auth;

    return await profile.getProfile(access_token);
  } catch (err) {
    const error = err as AxiosError<IErrorResponse>;

    if (!error.response) {
      throw err;
    }

    const errorMessage = error.response.data.detail as string;
    return rejectWithValue(errorMessage);
  }
});

export const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state = action.payload;
    },
  },
  extraReducers: b => {
    b.addCase(getUserProfile.fulfilled, (state, action) => action.payload);
  },
});

export const { setProfile } = profileReducer.actions;
