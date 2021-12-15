import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import Button from 'react-bootstrap/Button';

import { PostContext } from '../contexts/PostContext';
import SinglePost from '../components/post/SinglePost';
import Slidebar from '../components/layouts/Slidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/layouts/Header';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
const Homepage = () => {
  const {
    postState: { posts, postsLoading },
    getAllPost,
  } = useContext(PostContext);
  const { search } = useLocation();
  //Start; get all posts
  useEffect(() => getAllPost(search), [search]);

  let body;
  if (postsLoading) {
    body = <span>Post loadding...</span>;
  } else if (posts.length === 0) {
    body = (
      <>
        <Row>
          <Col md={9} className="mt-4">
            <span className="not-blog">
              Không có bài viết nào cả
            </span>
          </Col>
          <Col md={3}>
            <Slidebar />
          </Col>
        </Row>
        <Link to="/write">
          <Button className="btn-floating">
            <i class="fas fa-plus"></i>
          </Button>
        </Link>
      </>
    );
  } else {
    body = (
      <>
        <Row>
          <Col md={9} className="mt-4">
            <Row>
              {posts.map((post) => (
                <Col key={post._id}>
                  <SinglePost post={post} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={3}>
            <Slidebar />
          </Col>
        </Row>
        <Link to="/write">
          <Button className="btn-floating">
            <i class="fas fa-plus"></i>
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Header />
      {body}
    </>
  );
};

export default Homepage;
