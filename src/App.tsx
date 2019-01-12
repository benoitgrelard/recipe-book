import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './apolloClient';
import { UserQuery } from './UserQuery';
import { Login } from './Login';
import { User } from './types';
import { logout } from './session';

export function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<h1>Recipe Book</h1>
			<UserQuery>
				{({ isLoading, user }) =>
					isLoading ? (
						<p>loading…</p>
					) : isLoggedIn(user) ? (
						<>
							<h2>Welcome, {user.name}</h2>
							<button onClick={() => logout()}>Logout</button>
						</>
					) : (
						<Login />
					)
				}
			</UserQuery>
		</ApolloProvider>
	);
}

function isLoggedIn(user: User) {
	return user && user.id !== undefined;
}
