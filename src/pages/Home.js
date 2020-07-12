import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import PostCardSkeleton from '../components/PostCardSkeleton';
import { AuthContext } from '../context/auth';
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
					<Transition.Group>
						{data &&
							data.getPosts.map((post) => (
								<Grid.Column
									mobile={12}
									tablet={6}
									computer={5}
									key={post.id}
									style={{ marginBottom: '20px' }}
								>
									<PostCard post={post} />
								</Grid.Column>
							))}
					</Transition.Group>}
			</Grid.Row>
		</Grid>
	);
}

const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			commentCount
			likes {
				username
			}
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

export default Home;
