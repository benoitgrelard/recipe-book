import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router, Redirect, Link } from '@reach/router';
import { apolloClient } from './apolloClient';
import { UserQuery } from './UserQuery';
import { Login } from './Login';
import { User } from './types';
import { logout } from './session';
import { UserContext } from './UserContext';
import { AddRecipe } from './AddRecipe';
import { RecipesList } from './RecipesList';

export function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<h1>Recipe Book</h1>
			<UserQuery>
				{({ isLoading, user }) =>
					isLoading ? (
						<p>loading…</p>
					) : !isLoggedIn(user) ? (
						<Login />
					) : (
						<UserContext.Provider value={user}>
							<p>
								Welcome back {user.name}{' '}
								<button type="button" onClick={() => logout()}>
									Logout
								</button>
							</p>
							<Router>
								<Redirect from="/" to="/recipes" noThrow />
								<RecipesList path="/recipes" />
								<AddRecipe path="/recipes/new" />
							</Router>
						</UserContext.Provider>
					)
				}
			</UserQuery>
		</ApolloProvider>
	);
}

function isLoggedIn(user: User) {
	return user && user.id !== undefined;
}
