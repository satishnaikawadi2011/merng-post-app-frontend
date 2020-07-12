import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import PostCardSkeleton from '../components/PostCardSkeleton';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function Home() {
	const skeletonArray = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8
	];
	const { user } = useContext(AuthContext);
	const { data, loading } = useQuery(FETCH_POSTS_QUERY);
	return (
		<Grid columns={3} divided centered>
			<Grid.Row textAlign="center" style={{ marginTop: '10px', fontSize: '2rem' }}>
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column mobile={12} tablet={12} computer={5} style={{ marginBottom: '20px' }}>
						{<PostForm />}
					</Grid.Column>
				)}
				{
					loading ? skeletonArray.map((key) => (
						<Grid.Column mobile={12} tablet={6} computer={5} key={key} style={{ marginBottom: '20px' }}>
							<PostCardSkeleton />
						</Grid.Column>
					)) :
					data &&
					data.getPosts &&
					data.getPosts.map((post) => (
						<Grid.Column mobile={12} tablet={6} computer={5} key={post.id} style={{ marginBottom: '20px' }}>
							<PostCard post={post} />
						</Grid.Column>
					))}
			</Grid.Row>
		</Grid>
	);
}

export default Home;
