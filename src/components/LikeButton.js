import React, { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function LikeButton(props) {
	const { user } = useContext(AuthContext);
	const { likeCount, id, likes } = props.post;
	useEffect(
		() => {
			if (user && likes.find((like) => like.username === user.username)) {
				setLiked(true);
			}
			else {
				setLiked(false);
			}
		},
		[
			likes,
			user
		]
	);
	const [
		liked,
		setLiked
	] = useState(false);

	const [
		likePost
	] = useMutation(LIKE_POST_MUTATION, {
		variables : { postId: id }
	});

	const likeButton =
		user ? liked ? <Button color="orange">
			<Icon name="heart" />
		</Button> :
		<Button color="orange" basic>
			<Icon name="heart" />
		</Button> :
		<Button as={Link} to="/login" color="orange" basic>
			<Icon name="heart" />
		</Button>;
	return (
		<Button as="div" labelPosition="right" onClick={likePost}>
			<Popup
				content={

						liked ? 'Unlike' :
						'Like'
				}
				inverted
				trigger={likeButton}
			/>
			<Label basic color="orange" pointing="left">
				{likeCount}
			</Label>
		</Button>
	);
}

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default LikeButton;
