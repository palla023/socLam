import { MoreVert } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import axios from "axios";
import { format } from "timeago.js"; // eslint-disable-next-line
import timeago from 'timeago.js';    // eslint-disable-next-line
// import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length); //for storing Likes Count
  const [isLiked, setIsLiked] = useState(false); //for checking the condition

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext);
//To Resolve Like, Dislike, Dislike
//One User can like and dislike
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id, post.likes])      


  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users?userId=${post.userId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err.message); 
      }
    };
    fetchHandler();
  }, [post.userId]);
  const likeHandler = () => {
    try{
      axios.put('http://localhost:5000/api/posts/'+post._id+"/like", {userId:currentUser._id})
    }catch(err){
      console.log(err.message)
    }
    setLike(isLiked ? like - 1 : like + 1); //By deafult False
    setIsLiked(!isLiked); //If the above Condition is false, this would be True And Viseversa
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>    
            {/* <TimeAgo
              className="postDate"
              datetime={post.createdAt}
              locale="IN_CN"
            /> */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
            {/* post.likes.length coming from Post Model Likes Array */}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
