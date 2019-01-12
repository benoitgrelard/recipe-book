import React, { useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './apolloClient';
import { UserQuery } from './UserQuery';
import { Login } from './Login';
import { User } from './types';
import { logout } from './session';
import { UserContext } from './UserContext';
import { AddRecipe } from './AddRecipe';
import { RecipesList } from './RecipesList';

export function App() {
	const [isAddingRecipe, setIsAddingRecipe] = useState(false);

	return (
		<ApolloProvider client={apolloClient}>
			<h1>Recipe Book</h1>
			<UserQuery>
				{({ isLoading, user }) =>
					isLoading ? (
						<p>loading…</p>
					) : isLoggedIn(user) ? (
						<UserContext.Provider value={user}>
							<h2>
								Welcome back {user.name}{' '}
								<button onClick={() => logout()}>Logout</button>
							</h2>
							<hr />
							{isAddingRecipe ? (
								<>
									<button onClick={() => setIsAddingRecipe(false)}>
										Cancel
									</button>
									<AddRecipe
										onSuccess={() => setIsAddingRecipe(false)}
										onError={console.warn}
									/>
								</>
							) : (
								<>
									<button onClick={() => setIsAddingRecipe(true)}>
										Add recipe
									</button>
									<RecipesList />
								</>
							)}
						</UserContext.Provider>
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
