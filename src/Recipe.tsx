import React, { FC } from 'react';
import { Link, RouteComponentProps, NavigateFn } from '@reach/router';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Recipe as RecipeType } from './types';

type RecipeProps = RouteComponentProps<{
	recipeId: string;
}>;

export const Recipe: FC<RecipeProps> = ({ navigate: navigateFn, recipeId }) => {
	const navigate = navigateFn as NavigateFn;
	return (
		<RecipeQuery
			fetchPolicy="network-only"
			query={gql`
				query recipe($id: ID!) {
					Recipe(id: $id) {
						id
						name
						description
						author {
							name
						}
					}
				}
			`}
			variables={{ id: recipeId }}
		>
			{({ loading, data }) => {
				const recipe = data!.Recipe;
				return loading ? (
					<p>loading recipe…</p>
				) : !recipe ? (
					<p>couldn't load recipe 😢</p>
				) : (
					<>
						<h2>
							{recipe.name} – {recipe.author.name}
							<DeleteButton
								recipeId={recipe.id}
								onSuccess={() => navigate('/recipes')}
							/>
						</h2>
						<Link to="/recipes">👈back</Link>
						<p>{recipe.description}</p>
					</>
				);
			}}
		</RecipeQuery>
	);
};

type RecipeData = {
	Recipe?: RecipeType;
};

class RecipeQuery extends Query<RecipeData> {}

const DeleteButton: FC<{ recipeId: string; onSuccess?: () => void }> = ({
	recipeId,
	onSuccess,
}) => (
	<DeleteRecipeMutation
		mutation={gql`
			mutation deleteRecipe($id: ID!) {
				deleteRecipe(id: $id) {
					id
				}
			}
		`}
		variables={{ id: recipeId }}
	>
		{deleteRecipe => (
			<button
				type="button"
				onClick={() => deleteRecipe().then(onSuccess, console.warn)}
			>
				delete
			</button>
		)}
	</DeleteRecipeMutation>
);

type DeleteRecipeData = {
	deleteRecipe?: RecipeType;
};

type DeleteRecipeVariables = {
	id: string;
};

class DeleteRecipeMutation extends Mutation<
	DeleteRecipeData,
	DeleteRecipeVariables
> {}
