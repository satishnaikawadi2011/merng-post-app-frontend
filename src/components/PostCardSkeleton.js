import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import classes from './Skeleton.module.css';

function PostCardSkeleton() {
	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
				/>
				<div className={classes.username} />
				<div className={classes.date} />
				<div className={classes.body} />
				<div className={classes.body} />
			</Card.Content>
			<Card.Content extra className={classes.btn__container}>
				<div className={classes.btn1} style={{ marginRight: '10px', marginBottom: '10px' }} />
				<div className={classes.btn2} />
			</Card.Content>
		</Card>
	);
}

export default PostCardSkeleton;
