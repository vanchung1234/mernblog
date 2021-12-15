import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { PostContext } from '../../contexts/PostContext';
import { Link } from 'react-router-dom';
const ActionBtn = ({ postState }) => {
  const { deletePost } = useContext(PostContext);
  return (
    <>
      <Link
        to="/updatePost"
        state={{
          postState,
        }}
      >
        <Button className="post-button">
          <i class="far fa-edit"></i>
        </Button>
      </Link>

      <Button
        className="post-button"
        onClick={deletePost.bind(this, postState._id)}
      >
        <i class="fas fa-trash"></i>
      </Button>
    </>
  );
};

export default ActionBtn;
