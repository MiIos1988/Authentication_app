import axios from "axios";
import jwt_decode from 'jwt-decode';

type UserData  = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
type LoginData  = {
    email: string;
    password: string;
  }
type ResetPassword  = {
    email: string,
  }
type NewPassword  = {
    password: string,
    token: string;
  }
type Token  = {
    token: string;
  }
type DecodedToken = {
    role?: string;
  }

export const userData = (data: UserData) => axios.post("/auth/register", data);

export const userDataGoogle = (data: Token) => axios.post("/auth/register-google", data);

export const loginData = (data: LoginData) => axios.post("/auth/login", data);

export const resetPassword = (data: ResetPassword) => axios.post("/auth/reset-password", data);

export const newPassword = (data: NewPassword) => axios.post("/auth/new-password", data);

export const checkToken = (data: Token) => axios.post("/auth/check-token", data);

export const userDataGoogleLogin = (data: Token) => axios.post("/auth/login-google", data);

export const setTokenInLocalStorage = (token: string) => localStorage.setItem("token-acc", JSON.stringify(token))

export const isUserLogin = () => localStorage.getItem("token-acc");

const token = localStorage.getItem("token-acc");

export const isUser = () => token && isUserLogin() && jwt_decode<DecodedToken>(token)?.role === "user";

export const isAdmin = () => token && isUserLogin() && jwt_decode<DecodedToken>(token)?.role === "admin";