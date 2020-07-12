import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

function Register(props) {
	const context = useContext(AuthContext);
	const [
		errors,
		setErrors
	] = useState({});
	const [
		values,
		setValues
	] = useState({
		username        : '',
		email           : '',
		password        : '',
		confirmPassword : ''
	});
	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const [
		addUser,
		{ loading }
	] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			// console.log(result);
			context.login(result.data.register);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables : values
	});
	const onSubmit = (e) => {
		e.preventDefault();
		addUser();
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
				<h1>Register Here</h1>
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
					label="Email"
					placeholder="Email.."
					value={values.email}
					onChange={onChange}
					name="email"
					type="text"
					error={

							errors.email ? true :
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
				<Form.Input
					label="Confirm Password"
					placeholder="Confirm Password.."
					value={values.confirmPassword}
					onChange={onChange}
					name="confirmPassword"
					type="password"
					error={

							errors.confirmPassword ? true :
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

const REGISTER_USER = gql`
	mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
