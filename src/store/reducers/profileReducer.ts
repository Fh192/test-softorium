import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '..';
import { profile } from '../../api/profile';
import { ErrorResponse } from '../../types/common';
import { Profile } from '../../types/profile';

const initialState: Profile = {
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
  Profile,
  void,
  { state: RootState; rejectValue: string }
>('profile/getUserProfile', async (_, { rejectWithValue, getState }) => {
  try {
    const { access_token } = getState().auth;

    return await profile.getProfile(access_token);
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

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
    setProfile: (state, action: PayloadAction<Profile>) => {
      state = action.payload;
    },
  },
  extraReducers: b => {
    b.addCase(getUserProfile.fulfilled, (state, action) => action.payload);
  },
});

export const { setProfile } = profileReducer.actions;
