export interface RegistrationState {
  username: string
  email: string
  password: string
  confirmPassword: string
  city: string
  error: RegisterUserError | null
}

export interface LoginState {
  username: string
  email: string
  password: string
  photoUrl: string
  city: string
  error: RegisterUserError | null
  isLoggedIn: boolean
}

export interface User {
  id: number
  email: string
  username: string
  city: string
  photoUrl: string
}

export interface UserState {
  users: User | null;
  loading: boolean;
  error: string | null;
}

export interface RegisterUserResponse {
  username: string
  text: string
  error: null
  data: User
}

export interface RegisterUserError {
  message: string | undefined
 
}

export interface AuthState {
  isLoggedIn: boolean
  username: { email: string; id: number } | null
}
