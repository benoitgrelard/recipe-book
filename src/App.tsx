import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router, Redirect, Link } from '@reach/router';
import { apolloClient } from './apolloClient';
import { UserQuery } from './UserQuery';
import { Login } from './Login';
import { User } from './types';
import { logout } from './session';
import { Recipes } from './Recipes';
import { AddRecipe } from './AddRecipe';
import { Recipe } from './Recipe';

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
					) : !user ? (
						`couldn't load user 😢`
					) : (
						<>
							<p>
								Welcome back {user.name}{' '}
								<button type="button" onClick={() => logout()}>
									Logout
								</button>
							</p>
							<Router>
								<Redirect from="/" to="/recipes" noThrow />
								<Recipes path="/recipes" />
								<AddRecipe path="/recipes/new" authorId={user.id} />
								<Recipe path="/recipes/:recipeId" />
							</Router>
						</>
					)
				}
			</UserQuery>
		</ApolloProvider>
	);
}

function isLoggedIn(user?: User) {
	return user && user.id !== undefined;
}
