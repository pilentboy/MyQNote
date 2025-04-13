import { post } from "./apiService";

export const login = (data: any) => post("auth/login", data, undefined);
export const register = (data: any) => post("auth/register", data, undefined);
