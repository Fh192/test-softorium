import { IProfile } from '../types/profile';
import { api } from './instance';

export const profile = {
  getProfile: async (access_token: string) => {
    const response = await api.get<IProfile>(`users/me/`, {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    });
    return response.data;
  },
};
