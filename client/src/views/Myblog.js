import React, { useContext, useEffect } from 'react';
import { PostContext } from '../contexts/PostContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SinglePost from '../components/post/SinglePost';
import MyblogHeader from '../components/layouts/MyblogHeader';
import MySlidebar from '../components/layouts/MySlidebar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const Myblog = () => {
  const {
    postState: { post, posts, postsLoading },
    getMyPosts,
  } = useContext(PostContext);

  useEffect(() => getMyPosts(), []);

  let body;
  if (postsLoading) {
    body = <span>Posts Loading ...</span>;
  } else if (posts.length === 0) {
    body = (
      <>
        <Row>
          <Col md={9} className="mt-4 not-blog-block">
            <span className="not-blog">
              Bạn chưa đăng bài viết nào cả. Tạo bài viết
              ngay nào :)
            </span>
          </Col>
          <Col md={3}>
            <MySlidebar />
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
            <MySlidebar />
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
      <MyblogHeader />
      {body}
    </>
  );
};

export default Myblog;
