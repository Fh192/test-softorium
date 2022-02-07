export interface SigninData {
  username: string;
  password: string;
}

export interface SigninResponse {
  access_token: string;
  token_type: string;
}

export interface SignupData {
  phone: string;
  password: string;
  name: string;
  email: string;
  birthday: string;
  time_zone: string;
  avatar_img: string;
}
