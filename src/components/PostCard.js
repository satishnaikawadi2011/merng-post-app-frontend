import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard(props) {
	const { user } = useContext(AuthContext);
	const { body, createdAt, likeCount, commentCount, likes, username, id } = props.post;
	const likePost = () => {
		console.log('post liked');
	};
	const commentOnPost = () => {
		console.log('comment');
	};
	return (
		<Card fluid>
			<Card.Content>
				<Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton post={{ likeCount, likes, id }} />
				<Popup
					content="Comment on a Post"
					inverted
					trigger={
						<Button
							as={Link}
							to={`/posts/${id}`}
							labelPosition="right"
							onClick={commentOnPost}
							style={{ marginBottom: '10px' }}
						>
							<Button color="brown" basic>
								<Icon name="comments" />
							</Button>
							<Label basic color="brown" pointing="left">
								{commentCount}
							</Label>
						</Button>
					}
				/>
				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
