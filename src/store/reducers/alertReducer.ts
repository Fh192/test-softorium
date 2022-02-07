import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert, AlertValiant } from '../../types/alert';

const initialState: Alert = {
  message: '',
  variant: 'success',
};

export const alertReducer = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (
      state,
      action: PayloadAction<{ message: string; variant: AlertValiant }>
    ) => {
      const { message, variant } = action.payload;

      state.message = message;
      state.variant = variant;
    },
  },
});

export const { setAlert } = alertReducer.actions;
