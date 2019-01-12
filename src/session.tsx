const TOKEN_KEY = 'recipe-book-token';

export function setToken(token: string) {
	window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
	return window.localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
	window.localStorage.removeItem(TOKEN_KEY);
}

export function login(token: string, redirectUrl = '/') {
	setToken(token);
	window.location.replace(redirectUrl);
}

export function logout(redirectUrl = '/') {
	deleteToken();
	window.location.replace(redirectUrl);
}
