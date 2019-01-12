import React, { FC, ReactNode } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { propOr } from 'ramda';
import { User } from './types';

type UserData = {
	user: User;
};

class BaseUserQuery extends Query<UserData> {}

type LoginRenderProp = {
	isLoading: boolean;
	user: User;
};

type UserQueryProps = {
	children: (arg: LoginRenderProp) => ReactNode;
};

export const UserQuery: FC<UserQueryProps> = ({ children }) => (
	<BaseUserQuery
		query={gql`
			query user {
				user {
					id
					name
				}
			}
		`}
		fetchPolicy="network-only"
	>
		{({ loading, data }) =>
			children({
				isLoading: loading,
				user: propOr({}, 'user', data),
			})
		}
	</BaseUserQuery>
);
