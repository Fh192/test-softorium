export interface ISigninData {
  username: string;
  password: string;
}

export interface ISigninResponse {
  access_token: string;
  token_type: string;
}

export interface ISignupData {
  phone: string;
  password: string;
  name: string;
  email: string;
  birthday: string;
  time_zone: string;
  avatar_img: string;
}
