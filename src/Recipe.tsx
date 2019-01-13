import React, { FC } from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Recipe as RecipeType } from './types';

type RecipeProps = RouteComponentProps<{
	recipeId: string;
}>;

export const Recipe: FC<RecipeProps> = ({ recipeId }) => (
	<RecipeQuery
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
					</h2>
					<Link to="/recipes">👈back</Link>
					<p>{recipe.description}</p>
				</>
			);
		}}
	</RecipeQuery>
);

type RecipeData = {
	Recipe?: RecipeType;
};

class RecipeQuery extends Query<RecipeData> {}
