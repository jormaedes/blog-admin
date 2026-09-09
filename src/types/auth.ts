export interface User {
	id: number;
	firstname: string;
	lastname: string;
	username: string;
	userType: "AUTHOR";
}

export interface LoginResponse {
	token: string;
	user: User;
}
