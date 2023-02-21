import { tokenI } from "./tokenI";

export type role = 'user' | 'admin'

export interface UserResponseI {
    id: number;
    email: string;
    tokens: tokenI;
    role: role;
  }