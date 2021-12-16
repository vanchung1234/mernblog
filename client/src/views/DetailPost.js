import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Moment from 'react-moment';
const PF = 'https://chungblogapp.herokuapp.com/images/';

const DetailPost = () => {
  const location = useLocation();
  const post = location.state.post;
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={PF + post.photo}
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}

          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="">
                {post.user.username}
              </Link>
            </b>
          </span>
          <Moment fromNow>{post.createdAt}</Moment>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  );
};

export default DetailPost;
