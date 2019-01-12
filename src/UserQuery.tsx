import React, { FC, ReactNode } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { propOr } from 'ramda';
import { User } from './types';

type UserQueryProps = {
	children: (
		arg: {
			isLoading: boolean;
			user: User;
		}
	) => ReactNode;
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

type UserData = {
	user?: User;
};

class BaseUserQuery extends Query<UserData> {}
