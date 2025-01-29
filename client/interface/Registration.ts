
export interface RegistrationState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  error: RegisterUserError | null; 
}


export interface LoginState {
  username: string;
  email: string;
  password: string;
  city: string;
  error: RegisterUserError | null; 
  isLoggedIn: boolean; 
  
}


export interface RegisterUserResponse {
  username: string;
  text: string; 
error: null;
  data: {
    id: number;
    email: string;
    username: string;
    city: string;
  };
}


export interface RegisterUserError {
  message: string; 
}


export interface AuthState {
  isLoggedIn: boolean; 
  username: { email: string; id: number } | null; 
}