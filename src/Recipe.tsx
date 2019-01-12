import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';

type RecipeProps = RouteComponentProps<{
	recipeId: string;
}>;

export const Recipe: FC<RecipeProps> = ({ recipeId }) => (
	<>
		<h2>A recipe</h2>
		<p>{recipeId}</p>
	</>
);
