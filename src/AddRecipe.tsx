import React, { FC, useContext } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { mapControlsToValues } from './utils';
import { UserContext } from './UserContext';
import { User, Recipe } from './types';
import { RECIPES_QUERY, RecipesData } from './RecipesList';

type AddRecipeProps = {
	onSuccess?: () => void;
	onError?: () => void;
};

export const AddRecipe: FC<AddRecipeProps> = ({ onSuccess, onError }) => {
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
								cache.writeQuery<RecipesData>({
									query: RECIPES_QUERY,
									data: { allRecipes: allRecipes!.concat([createRecipe]) },
								});
							},
						}).then(onSuccess, onError);
					}}
				>
					<fieldset>
						<legend>
							<h2>Add Recipe</h2>
						</legend>

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
					</fieldset>
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
