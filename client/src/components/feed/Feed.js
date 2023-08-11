import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


const Feed = ({ username }) => {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);
	// console.log(user)
	useEffect(() => {
		const fetchHandler = async () => {
			try {
				const res = username
					? await axios.get("http://localhost:5000/api/posts/profile/" + username)
					: await axios.get("http://localhost:5000/api/posts/timeline/" + user._id);
				setPosts(
					res.data.sort((p1, p2) => {
						return new Date(p2.createdAt) - new Date(p1.createdAt);
					})
				);
			} catch (err) {
				console.log(err.message)
			}
		};
		fetchHandler();
	}, [username, user._id]);

	return (
		<div className='feed'>
			<div className="feedWrapper">
				{(!username || username === user.username) && <Share />}
				{posts.map(post => (
					<Post key={post._id} post={post} />
				))
				}

			</div>
		</div>
	)
}

export default Feed
