export interface User {
	id: number;
	firstname: string;
	lastname: string;
	username: string;
	userType: string;
}

export interface LoginResponse {
	token: string;
	user: User;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (userData: User) => void;
  logout: () => void;
  restoreAuth: () => Promise<void>;
}