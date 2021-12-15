import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import Alert from '../layouts/Alert';
const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmpassword: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmpassword } =
    registerForm;

  const changeRegisterForm = (e) =>
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });

  const register = async (e) => {
    e.preventDefault();

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({
          type: 'danger',
          message: registerData.message,
        });
        setTimeout(() => setAlert(null), 3000);
      } else {
        setAlert({
          type: 'success',
          message: registerData.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form_chung" onSubmit={register}>
      <span
        className="loginTitle_chung"
        style={{ fontSize: '24px' }}
      >
        Đăng ký
      </span>
      <Alert info={alert} />
      <input
        className="loginInput_chung"
        type="text"
        name="username"
        required
        onChange={changeRegisterForm}
        value={username}
        placeholder="Tên đăng nhập"
      />
      <input
        className="loginInput_chung"
        type="password"
        name="password"
        required
        onChange={changeRegisterForm}
        value={password}
        placeholder="Mật khẩu"
      />
      <input
        className="loginInput_chung"
        type="password"
        name="confirmpassword"
        required
        onChange={changeRegisterForm}
        value={confirmpassword}
        placeholder="Nhập lại mật khẩu"
      />
      <button className="loginButton_chung" type="submit">
        Đăng ký
      </button>
      <span>
        Thành viên cũ?
        <Link className="redirect_chung" to="/login">
          Đăng nhập
        </Link>
      </span>
    </form>
  );
};
export default RegisterForm;
