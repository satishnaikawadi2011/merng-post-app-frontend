import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

function Login(props) {
	const context = useContext(AuthContext);
	const [
		errors,
		setErrors
	] = useState({});
	const [
		values,
		setValues
	] = useState({
		username : '',
		password : ''
	});
	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const [
		loginUser,
		{ loading }
	] = useMutation(LOGIN_USER, {
		update(proxy, result) {
			// console.log(result);
			context.login(result.data.login);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables : values
	});
	const onSubmit = (e) => {
		e.preventDefault();
		loginUser();
	};
	return (
		<div className="form-container">
			<Form
				noValidate
				onSubmit={onSubmit}
				className={

						loading ? 'loading' :
						''
				}
			>
				<h1>Login Here</h1>
				<Form.Input
					label="Username"
					placeholder="Username.."
					value={values.username}
					onChange={onChange}
					name="username"
					type="text"
					error={

							errors.username ? true :
							false
					}
				/>
				<Form.Input
					label="Password"
					placeholder="Password.."
					value={values.password}
					onChange={onChange}
					name="password"
					type="password"
					error={

							errors.password ? true :
							false
					}
				/>
				<Button type="submit" color="orange">
					Submit
				</Button>
			</Form>
			{Object.values(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">{Object.values(errors).map((value) => <li key={value}>{value}</li>)}</ul>
				</div>
			)}
		</div>
	);
}

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Login;
