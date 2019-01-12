import React, { FC, ReactNode } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { login } from './session';

type LoginData = {
	signinUser: {
		token: string;
	};
};

class BaseLoginMutation extends Mutation<LoginData> {}

type LoginFn = (email: string, password: string) => void;

type LoginRenderProp = {
	login: LoginFn;
};

type LoginMutationProps = {
	children: (arg: LoginRenderProp) => ReactNode;
};

export const LoginMutation: FC<LoginMutationProps> = ({ children }) => (
	<BaseLoginMutation
		mutation={gql`
			mutation signinUser($email: String!, $password: String!) {
				signinUser(email: { email: $email, password: $password }) {
					token
				}
			}
		`}
	>
		{mutate =>
			children({
				login: (email, password) =>
					mutate({
						variables: { email, password },
					}).then(response =>
						// @ts-ignore
						login(response.data.signinUser.token)
					),
			})
		}
	</BaseLoginMutation>
);
