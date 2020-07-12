import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Form, Button } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {
	const [
		errors,
		setErrors
	] = useState({});
	const [
		body,
		setBody
	] = useState('');
	const [
		createPost,
		{ error }
	] = useMutation(CREATE_POST, {
		variables : { body },
		update(proxy, result) {
			console.log(result);
			const data = proxy.readQuery({
				query : FETCH_POSTS_QUERY
			});
			proxy.writeQuery({
				query : FETCH_POSTS_QUERY,
				data  : {
					getPosts : [
						result.data.createPost,
						...data.getPosts
					]
				}
			});
			setBody('');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		}
	});
	const onSubmit = (e) => {
		e.preventDefault();
		createPost();
	};
	const onChange = (e) => {
		setBody(e.target.value);
	};

	return (
		<React.Fragment>
			<Form onSubmit={onSubmit}>
				<h1>Create a Post !</h1>
				<Form.Field>
					<Form.Input
						type="text"
						name="body"
						placeholder="Create a post ..."
						value={body}
						onChange={onChange}
						error={

								error ? true :
								false
						}
					/>
					<Button type="submit" color="orange">
						Submit
					</Button>
				</Form.Field>
			</Form>
			{Object.values(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">{Object.values(errors).map((value) => <li key={value}>{value}</li>)}</ul>
				</div>
			)}
		</React.Fragment>
	);
}

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			username
			commentCount
			likeCount
			createdAt
			body
			comments {
				username
				id
				body
				createdAt
			}
			likes {
				username
				id
				createdAt
			}
		}
	}
`;

export default PostForm;
