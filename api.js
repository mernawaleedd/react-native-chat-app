import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Define your API base URL
// const API_BASE_URL = "http://192.168.1.24:5000/api";

const API_BASE_URL = "http://192.168.1.29:6587/api";
// const API_BASE_URL = "http://196.219.138.210:6587/api";

// Create an Axios instance
const api = axios.create({
	baseURL: API_BASE_URL,
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
	async (config) => {
		try {
			const AccessToken = await SecureStore.getItemAsync("AccessToken");
			if (AccessToken) {
				config.headers.Authorization = `Bearer ${AccessToken}`;
			}
		} catch (error) {
			console.error("Error getting access token:", error);
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		console.log(error);
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				// Get the refresh token from SecureStore
				const refreshToken = await SecureStore.getItemAsync("refreshToken");

				// Request a new access token using the refresh token
				const response = await axios.post(`${API_BASE_URL}/auth/token`, {
					refreshToken,
				});

				const { accessToken } = response.data;

				// Save the new access token to SecureStore
				await SecureStore.setItemAsync("accessToken", accessToken);

				// Update the authorization header and retry the original request
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return api(originalRequest);
			} catch (error) {
				await logOut()
				console.error("Error refreshing access token:", error);
			}
		}
		return Promise.reject(error);
	}
);

const saveTokens = async (
	user
) => {
	console.log(
		user
	)
	await SecureStore.setItemAsync("AccessToken", JSON.stringify(user.AccessToken));
	await SecureStore.setItemAsync("ApiKeyID", JSON.stringify(user.ApiKeyID));
	await SecureStore.setItemAsync("CompanyID", JSON.stringify(user.CompanyID));
	await SecureStore.setItemAsync("Email", JSON.stringify(user.Email));
	await SecureStore.setItemAsync("UserName", JSON.stringify(user.Username));
};

// Usage in your login function

export const login = async (response) => {
	try {
		const req = await axios.request(response);
		const { success, user } = req.data;
		const { AccessToken, ApiKeyID, CompanyID, Email, UserName } = user;
		console.log(user)
		if (success) {
			await saveTokens(
				user
			);
			return {
				AccessToken,
				ApiKeyID,
				CompanyID,
				Email,
				UserName: user.Username
			};
		} else {
			console.error("Login failed:", response.data);
			throw new Error("Login failed");
		}
	} catch (error) {
		console.error("Login error:", error.message);
		throw error;
	}
};

export const logOut = async () => {
	try {
		await SecureStore.deleteItemAsync("AccessToken");
		await SecureStore.deleteItemAsync("ApiKeyID");
		await SecureStore.deleteItemAsync("CompanyID");
		await SecureStore.deleteItemAsync("Email");
		await SecureStore.deleteItemAsync("UserName");
	} catch (error) {
		throw error;
	}
};

export default api;
