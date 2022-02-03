import { alertReducer } from './alertReducer';
import { authReducer } from './authReducer';
import { profileReducer } from './profileReducer';

export const rootReducer = {
  [authReducer.name]: authReducer.reducer,
  [profileReducer.name]: profileReducer.reducer,
  [alertReducer.name]: alertReducer.reducer,
};
