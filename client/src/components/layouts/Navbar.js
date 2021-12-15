import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
const Navbar = () => {
  const {
    authState: {
      user: { username, Avatar },
    },
    logoutUser,
  } = useContext(AuthContext);
  const PF = 'http://localhost:5000/images/';

  const logout = () => logoutUser();
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/myblog">
              MY BLOG
            </Link>
          </li>
          <li className="topListItem"></li>
        </ul>
      </div>
      <div className="topRight">
        <input type="text"></input>
        <i className="topSearchIcon fas fa-search"></i>
        <span className="username">{username}</span>
        <Link to="user-setting">
          <img
            className="avatar"
            src={PF + Avatar}
            alt=""
          />
        </Link>

        <span className="Logout" onClick={logout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Navbar;
