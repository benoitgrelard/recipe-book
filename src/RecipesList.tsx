import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { propOr } from 'ramda';
import { Recipe } from './types';

export const RecipesList = () => (
	<RecipesQuery query={RECIPES_QUERY}>
		{({ loading, data }) => {
			const recipes: Recipe[] = propOr([], 'allRecipes', data);
			return loading ? (
				<p>loading…</p>
			) : recipes.length === 0 ? (
				<p>No recipes yet :(</p>
			) : (
				<ul>
					{recipes.map(recipe => (
						<li key={recipe.id}>
							{recipe.name} (created by {recipe.author.name})
						</li>
					))}
				</ul>
			);
		}}
	</RecipesQuery>
);

export type RecipesData = {
	allRecipes?: Recipe[];
};

class RecipesQuery extends Query<RecipesData> {}

export const RECIPES_QUERY = gql`
	query recipes {
		allRecipes {
			id
			name
			description
			author {
				name
			}
		}
	}
`;
