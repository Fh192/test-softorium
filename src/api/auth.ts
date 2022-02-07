import { SigninData, SigninResponse, SignupData } from '../types/auth';
import { Profile } from '../types/profile';
import { api } from './instance';

export const auth = {
  signin: async (signinData: SigninData) => {
    const fr = new FormData();
    fr.set('username', signinData.username);
    fr.set('password', signinData.password);

    const response = await api.post<SigninResponse>(`/signin`, fr);

    return { ...response.data };
  },

  signup: async (signupData: SignupData) => {
    const response = await api.post<Profile>(`/signup`, signupData);
    return response.data;
  },
};
