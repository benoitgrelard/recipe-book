import React, { FC, useContext } from 'react';
import { RouteComponentProps, NavigateFn, Link } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { mapControlsToValues } from './utils';
import { UserContext } from './UserContext';
import { User, Recipe } from './types';
import { RECIPES_QUERY, RecipesData } from './RecipesList';

export const AddRecipe: FC<RouteComponentProps> = ({
	navigate: navigateFn,
}) => {
	const navigate = navigateFn as NavigateFn;
	const user = useContext(UserContext) as User;

	return (
		<AddRecipeMutation
			mutation={gql`
				mutation createRecipe(
					$name: String
					$description: String
					$authorId: ID!
				) {
					createRecipe(
						name: $name
						description: $description
						authorId: $authorId
					) {
						id
						name
						description
						author {
							name
						}
					}
				}
			`}
		>
			{addRecipe => (
				<form
					onSubmit={event => {
						event.persist();
						event.preventDefault();
						const { name, description } = mapControlsToValues(
							// @ts-ignore
							event.target.elements
						);
						addRecipe({
							variables: {
								name,
								description,
								authorId: user.id,
							},
							update: (cache, mutationResults) => {
								const { createRecipe } = mutationResults.data!;
								const { allRecipes } = cache.readQuery<RecipesData>({
									query: RECIPES_QUERY,
								})!;

								if (allRecipes) {
									cache.writeQuery<RecipesData>({
										query: RECIPES_QUERY,
										data: { allRecipes: allRecipes.concat([createRecipe]) },
									});
								}
							},
						}).then(() => navigate('/'), console.warn);
					}}
				>
					<h2>Add Recipe</h2>
					<Link to="/recipes">👈back</Link>
					<label>
						<div>Name</div>
						<input type="text" name="name" autoFocus />
					</label>
					<label>
						<div>Description</div>
						<textarea name="description" autoComplete="off" />
					</label>
					<br />
					<button type="submit">Add Recipe</button>
				</form>
			)}
		</AddRecipeMutation>
	);
};

type AddRecipeData = {
	createRecipe: Recipe;
};

type AddRecipeVariables = {
	name?: string;
	description?: string;
	authorId: string;
};

class AddRecipeMutation extends Mutation<AddRecipeData, AddRecipeVariables> {}
