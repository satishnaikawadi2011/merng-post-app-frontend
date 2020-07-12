import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Image, Card, CardDescription, Button, Icon, Label, Form } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { AuthContext } from '../context/auth';

function SinglePost(props) {
	const { user } = useContext(AuthContext);
	const postId = props.match.params.postId;
	const [
		comment,
		setComment
	] = useState('');
	const { data } = useQuery(FETCH_POST_QUERY, {
		variables : {
			postId
		}
	});
	const [
		submitComment
	] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment('');
		},
		variables : {
			postId,
			body   : comment
		}
	});
	const deletePost = () => {
		props.history.push('/');
	};
	let postMarkup;
	if (!data) {
		postMarkup = <p>Loading....</p>;
	}
	else {
		const { id, body, createdAt, username, likes, comments, likeCount, commentCount } = data.getPost;
		postMarkup = (
			<Grid centered>
				<Grid.Row>
					<Grid.Column mobile={14} tablet={2} computer={2}>
						<Image
							style={{ marginBottom: '10px' }}
							centered
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
							size="small"
						/>
					</Grid.Column>
					<Grid.Column mobile={16} computer={10} tablet={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<CardDescription>{body}</CardDescription>
							</Card.Content>
							<Card.Content extra>
								<LikeButton post={{ id, likes, likeCount }} />
								<Button
									as="div"
									labelPosition="right"
									onClick={() => {}}
									style={{ marginBottom: '10px' }}
								>
									<Button color="brown" basic>
										<Icon name="comments" />
									</Button>
									<Label basic color="brown" pointing="left">
										{commentCount}
									</Label>
								</Button>
								{user &&
								user.username === username && <DeleteButton postId={id} callback={deletePost} />}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<h4>Post a Comment</h4>
									<Form>
										<div className="ui action input fluid">
											<input
												type="text"
												placeholder="Comment ..."
												name="comment"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
											/>
											<button
												type="submit"
												className="ui button orange"
												onClick={submitComment}
												disabled={comment.trim() === ''}
											>
												Submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user &&
									user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
}

const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			username
			createdAt
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				body
				createdAt
			}
		}
	}
`;

const SUBMIT_COMMENT_MUTATION = gql`
	mutation createComment($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
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

export default SinglePost;
