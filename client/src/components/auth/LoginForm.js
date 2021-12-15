import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Alert from '../layouts/Alert';
const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const changeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({
          type: 'danger',
          message: loginData.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="form_chung" onSubmit={login}>
      <span className="LoginTitle_chung">Đăng nhập</span>
      <Alert info={alert} />
      <input
        className="loginInput_chung"
        type="text"
        name="username"
        required
        placeholder="Tên đăng nhập"
        onChange={changeLoginForm}
        value={username}
      />
      <input
        className="loginInput_chung"
        type="password"
        name="password"
        placeholder="Mật khẩu"
        required
        onChange={changeLoginForm}
        value={password}
      />
      <button className="loginButton_chung" type="submit">
        Login
      </button>
      <span>
        Thành viên mới?
        <Link to="/register" className="redirect_chung">
          Đăng ký
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
