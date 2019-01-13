import React, { FC, ReactNode } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { User } from './types';

type UserQueryProps = {
	children: (
		arg: {
			isLoading: boolean;
			user?: User;
		}
	) => ReactNode;
};

export const UserQuery: FC<UserQueryProps> = ({ children }) => (
	<BaseUserQuery
		fetchPolicy="network-only"
		query={gql`
			query user {
				user {
					id
					name
				}
			}
		`}
	>
		{({ loading, data }) =>
			children({
				isLoading: loading,
				user: data!.user,
			})
		}
	</BaseUserQuery>
);

type UserData = {
	user?: User;
};

class BaseUserQuery extends Query<UserData> {}
