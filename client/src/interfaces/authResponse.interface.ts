import { AppResponse } from "./response.interface";
import { User } from "./user.interface";

export interface AuthResponse extends AppResponse {
  accessToken: string;
  user: User;
}
