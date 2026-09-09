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
