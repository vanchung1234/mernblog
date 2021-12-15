import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ActionBtn from './ActionBtn';
import { AuthContext } from '../../contexts/AuthContext';
const SinglePost = ({ post }) => {
  const [postState, setPostState] = useState([]);
  const PF = 'http://localhost:5000/images/';

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  console.log(post);
  let body;
  if (username === post.user.username) {
    body = (
      <div className="post">
        {post.photo && (
          <Link
            to="/detail"
            state={{
              post,
            }}
          >
            <img
              className="postImg"
              src={PF + post.photo}
              alt=""
            />
          </Link>
        )}

        <div className="postInfo">
          <div className="postCats">
            <span className="">
              Thể loại: {post.categories}
            </span>
            <br></br>
            <ActionBtn postState={post} />
          </div>
          <span className="postTitle">
            <Link to="" className="link">
              {post.name}
            </Link>
          </span>
          <span className="postTitle">
            Tác giả: {post.user.username}
          </span>
          <Moment fromNow>{post.createdAt}</Moment>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    );
  } else {
    body = (
      <div className="post">
        <Link
          to="/detail"
          state={{
            post,
          }}
        >
          <img
            className="postImg"
            src={PF + post.photo}
            alt=""
          />
        </Link>
        <div className="postInfo">
          <div className="postCats">
            <span className="">
              Thể loại: {post.categories}
            </span>
          </div>
          <span className="postTitle">
            <Link to="" className="link">
              {post.name}
            </Link>
          </span>
          <span className="postTitle">
            Author:{post.user.username}
          </span>
          <Moment fromNow>{post.createdAt}</Moment>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    );
  }
  return <>{body}</>;
};

export default SinglePost;
