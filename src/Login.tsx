import React, { FC } from 'react';
import { LoginMutation } from './LoginMutation';
import { mapControlsToValues } from './utils';

export const Login: FC = () => (
	<LoginMutation>
		{({ login }) => (
			<form
				onSubmit={event => {
					event.persist();
					event.preventDefault();
					const { email, password } = mapControlsToValues(
						// @ts-ignore
						event.target.elements
					);
					login(email, password);
				}}
			>
				<fieldset>
					<legend>
						<h2>Login</h2>
					</legend>

					<label>
						<div>Email</div>
						<input type="email" name="email" autoFocus />
					</label>

					<label>
						<div>Password</div>
						<input type="password" name="password" autoComplete="off" />
					</label>

					<br />
					<button type="submit">Login</button>
				</fieldset>
			</form>
		)}
	</LoginMutation>
);
