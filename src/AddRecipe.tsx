import React, { FC } from 'react';
import { RouteComponentProps, NavigateFn, Link } from '@reach/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { RecipeEditor } from './RecipeEditor';
import { mapControlsToValues } from './utils';
import { Recipe } from './types';

type AddRecipeProps = RouteComponentProps & {
	authorId: string;
};

export const AddRecipe: FC<AddRecipeProps> = ({
	navigate: navigateFn,
	authorId,
}) => {
	const navigate = navigateFn as NavigateFn;
	let editedContent: string;

	return (
		<AddRecipeMutation
			mutation={gql`
				mutation addRecipe($name: String, $content: String, $authorId: ID!) {
					createRecipe(name: $name, content: $content, authorId: $authorId) {
						id
						name
						content
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
						const { name } = mapControlsToValues(
							// @ts-ignore
							event.target.elements
						);
						addRecipe({
							variables: { name, content: editedContent, authorId },
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
						<div>Content</div>
						<RecipeEditor
							value=""
							onChange={value => (editedContent = value)}
						/>
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
	content?: string;
	authorId: string;
};

class AddRecipeMutation extends Mutation<AddRecipeData, AddRecipeVariables> {}
