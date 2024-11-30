import React from 'react';
import { SplashScreen, Stack } from "expo-router";

export default function Layout() {
	return (
		// the global provider is the context provider for the app provide user data  look at the context folder
		<GlobalProvider>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerShown: false }}
				/>
                		<Stack.Screen
					name="DropdownsPage"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ChatPage"
					options={{ headerShown: false }}
				/>
                	<Stack.Screen
					name="Dropdown-Chat"
					options={{ headerShown: false }}
				/>
			</Stack>
		</GlobalProvider>
	);
}
