import { http } from "../lib/http";
import { User, UserLoginPayload, UserSignupPayload } from "../type";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const login = (payload: UserLoginPayload) =>
  http.post<LoginResponse>("/users/login", payload).then((response) => response.data);

export const signup = (payload: UserSignupPayload) =>
  http.post<{ message: string }>("/users/signup", payload).then((response) => response.data);

export const fetchCurrentUser = () =>
  http.get<{ user: User }>("/users/me").then((response) => response.data.user);
