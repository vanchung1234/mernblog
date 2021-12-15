import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const MySlidebar = () => {
  const {
    authState: {
      user: { username, createdAt, Avatar },
    },
  } = useContext(AuthContext);
  const PF = 'http://localhost:5000/images/';

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">
          Giới thiệu về tôi
        </span>
        <img
          style={{ width: '236px' }}
          src={PF + Avatar}
          alt=""
        />
        <p>Tình trạng: Ngu</p>

        <span>Tên người dùng: {username}</span>
        <span>
          Thời gian tham gia:
          <Moment fromNow>{createdAt}</Moment>
        </span>
      </div>
      <div className="sidebarItem">
        <Link className="user-setting" to="/user-setting">
          <span className="sidebarTitle">
            Chỉnh sửa hồ sơ
          </span>
        </Link>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW Admin</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
};

export default MySlidebar;
