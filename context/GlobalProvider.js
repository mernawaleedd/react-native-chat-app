import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const ApiKeyID = JSON.parse(await SecureStore.getItemAsync("ApiKeyID"));
				const UserName = JSON.parse(
					await SecureStore.getItemAsync("UserName")
				);
				const Email = JSON.parse(
					await SecureStore.getItemAsync("Email")
				);
				const CompanyID = JSON.parse(
					await SecureStore.getItemAsync("CompanyID")
				);
				if (UserName) {
					setIsLogged(true);
					setUser({
						UserName: UserName,
						Email: Email,
						CompanyID: CompanyID,
						ApiKeyID: ApiKeyID,
					});
					console.log(UserName)
				} else {
					setIsLogged(false);
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
				setIsLogged(false);
			}
			setLoading(false);
		};

		checkAuth();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLogged,
				setIsLogged,
				setLoading,
				user,
				setUser,
				loading,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
