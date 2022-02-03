import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlert, IAlertValiant } from '../../types/alert';

const initialState: IAlert = {
  message: '',
  variant: 'success',
};

export const alertReducer = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (
      state,
      action: PayloadAction<{ message: string; variant: IAlertValiant }>
    ) => {
      const { message, variant } = action.payload;

      state.message = message;
      state.variant = variant;
    },
  },
});

export const { setAlert } = alertReducer.actions;
