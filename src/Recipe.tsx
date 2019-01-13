import React, { FC, useState, ReactNode } from 'react';
import { Link, RouteComponentProps, NavigateFn } from '@reach/router';
import { Query, Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import Markdown from 'react-markdown';
import { RecipeEditor } from './RecipeEditor';
import { Recipe as RecipeType } from './types';

type RecipeProps = RouteComponentProps<{
	recipeId: string;
}>;

export const Recipe: FC<RecipeProps> = ({ navigate: navigateFn, recipeId }) => {
	const navigate = navigateFn as NavigateFn;
	const [isEditing, setIsEditing] = useState(false);
	let editedName: string;
	let editedDescription: string;

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
							{isEditing ? (
								<input
									type="text"
									defaultValue={recipe.name}
									onChange={event => (editedName = event.target.value)}
								/>
							) : (
								recipe.name
							)}{' '}
							– {recipe.author.name}
							{isEditing ? (
								<UpdateRecipeMutation>
									{updateRecipe => (
										<button
											type="button"
											onClick={() =>
												updateRecipe({
													variables: {
														id: recipe.id,
														name: editedName,
														description: editedDescription,
													},
												}).then(() => setIsEditing(false), console.warn)
											}
										>
											done
										</button>
									)}
								</UpdateRecipeMutation>
							) : (
								<button type="button" onClick={() => setIsEditing(true)}>
									edit
								</button>
							)}
							<DeleteButton
								recipeId={recipe.id}
								onSuccess={() => navigate('/recipes')}
							/>
						</h2>
						<Link to="/recipes">👈back</Link>
						{isEditing ? (
							<RecipeEditor
								value={recipe.description || ''}
								onChange={value => (editedDescription = value)}
							/>
						) : (
							<Markdown className="md-parsed" source={recipe.description} />
						)}
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

const UpdateRecipeMutation: FC<{
	children: (
		arg: MutationFn<UpdateRecipeData, UpdateRecipeVariables>
	) => ReactNode;
}> = ({ children }) => (
	<BaseUpdateRecipeMutation
		mutation={gql`
			mutation updateRecipe($id: ID!, $name: String, $description: String) {
				updateRecipe(id: $id, name: $name, description: $description) {
					id
					name
					description
				}
			}
		`}
	>
		{mutate => children(mutate)}
	</BaseUpdateRecipeMutation>
);

type UpdateRecipeData = {
	updateRecipe?: RecipeType;
};

type UpdateRecipeVariables = {
	id: string;
	name: string;
	description: string;
};

class BaseUpdateRecipeMutation extends Mutation<
	UpdateRecipeData,
	UpdateRecipeVariables
> {}
