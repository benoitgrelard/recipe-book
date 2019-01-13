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
				user: data!.user,
			})
		}
	</BaseUserQuery>
);

type UserData = {
	user?: User;
};

class BaseUserQuery extends Query<UserData> {}
