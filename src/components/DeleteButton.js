import React, { useState } from 'react';
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

function DeleteButton(props) {
	const [
		confirmOpen,
		setConfirmOpen
	] = useState(false);
	const { postId } = props;
	const mutation =
		props.commentId ? DELETE_COMMENT_MUTATION :
		DELETE_POST_MUTATION;
	const [
		deletePost
	] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false);
			if (!props.commentId) {
				const data = proxy.readQuery({
					query : FETCH_POSTS_QUERY
				});
				proxy.writeQuery({
					query : FETCH_POSTS_QUERY,
					data  : {
						getPosts : data.getPosts.filter((post) => post.id !== postId)
					}
				});
			}
			if (props.callback) {
				props.callback();
			}
		},
		variables : {
			postId,
			commentId : props.commentId
		}
	});
	return (
		<React.Fragment>
			<Popup
				content="Delete"
				inverted
				trigger={
					<Button as="div" color="grey" floated="right" onClick={() => setConfirmOpen(true)}>
						<Icon name="trash" style={{ margin: 0 }} />
					</Button>
				}
			/>
			<Confirm onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} open={confirmOpen} />
		</React.Fragment>
	);
}

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
				body
				createdAt
			}
			commentCount
		}
	}
`;

export default DeleteButton;
