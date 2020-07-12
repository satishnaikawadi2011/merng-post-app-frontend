import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard(props) {
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
				<Button
					as="div"
					labelPosition="right"
					onClick={likePost}
					style={{ marginRight: '10px', marginBottom: '10px' }}
				>
					<Button color="orange" basic>
						<Icon name="heart" />
						Like
					</Button>
					<Label basic color="orange" pointing="left">
						{likeCount}
					</Label>
				</Button>
				<Button as="div" labelPosition="right" onClick={commentOnPost}>
					<Button color="brown" basic>
						<Icon name="comments" />
						Comment
					</Button>
					<Label basic color="brown" pointing="left">
						{commentCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
}

export default PostCard;
