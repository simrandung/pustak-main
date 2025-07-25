
export interface RegisterResponse {
  message: string;
  user_id: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: string;
}
