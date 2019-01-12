import React, { FC } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { propOr } from 'ramda';
import { Recipe } from './types';

export const RecipesList: FC<RouteComponentProps> = () => (
	<RecipesQuery query={RECIPES_QUERY}>
		{({ loading, data }) => {
			const recipes: Recipe[] = propOr([], 'allRecipes', data);
			return (
				<>
					<h2>Recipes</h2>
					<Link to="/recipes/new">✌️Add recipe</Link>
					{loading ? (
						<p>loading…</p>
					) : recipes.length === 0 ? (
						<p>No recipes yet :(</p>
					) : (
						<ul>
							{recipes.map(recipe => (
								<li key={recipe.id}>
									{recipe.name} – {recipe.author.name}
								</li>
							))}
						</ul>
					)}
				</>
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
