import { post } from "./apiService";

export const login = (data: any) => post("login", data, undefined);
export const register = (data: any) => post("register", data, undefined);
