import { ISigninData, ISigninResponse, ISignupData } from '../types/auth';
import { IProfile } from '../types/profile';
import { api } from './instance';

export const auth = {
  signin: async (signinData: ISigninData) => {
    const fr = new FormData();
    fr.set('username', signinData.username);
    fr.set('password', signinData.password);

    const response = await api.post<ISigninResponse>(`/signin`, fr);

    return { ...response.data };
  },

  signup: async (signupData: ISignupData) => {
    const response = await api.post<IProfile>(`/signup`, signupData);
    return response.data;
  },
};
