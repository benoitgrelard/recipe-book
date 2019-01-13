import React, { FC } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Recipe } from './types';

export const Recipes: FC<RouteComponentProps> = () => (
	<RecipesQuery query={RECIPES_QUERY}>
		{({ loading, data }) => {
			const recipes: Recipe[] | undefined = data!.allRecipes;
			return (
				<>
					<h2>Recipes</h2>
					<Link to="/recipes/new">✌️Add recipe</Link>
					{loading ? (
						<p>loading…</p>
					) : !recipes ? (
						<p>couldn't load recipes 😢</p>
					) : recipes.length === 0 ? (
						<p>No recipes yet :(</p>
					) : (
						<ul>
							{recipes.map(recipe => (
								<li key={recipe.id}>
									<Link to={recipe.id}>
										{recipe.name} – {recipe.author.name}
									</Link>
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
