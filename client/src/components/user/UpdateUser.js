import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import Alert from '../layouts/Alert';
import { apiUrl } from '../../contexts/constant';
const UpdateUserForm = () => {
  const {
    authState: { user },
    updateUser,
  } = useContext(AuthContext);
  console.log(user);
  const PF = 'http://localhost:5000/images/';
  const [file, setFile] = useState(null);

  const [updatedUser, setUpdateUser] = useState(user);

  const [alert, setAlert] = useState(null);

  useEffect(() => setUpdateUser(user), [user]);

  const { password, confirmpassword } = updatedUser;

  const onChangeUpdatedUser = (event) =>
    setUpdateUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.Avatar = filename;
      try {
        await axios.post(`${apiUrl}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const updateData = await updateUser(updatedUser);
      if (updateData) {
        setAlert({
          type: 'success',
          message: updateData.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">
            Cập nhật hồ sơ
          </span>
          <Alert info={alert} />
          <span className="settingsDeleteTitle">
            <span>Thời gian tham gia: </span>
            <Moment fromNow>{user.createdAt}</Moment>
          </span>
        </div>
        <form className="settingsForm" onSubmit={onSubmit}>
          <label>{user.username}</label>
          <div className="settingsPP">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : PF + user.Avatar
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{' '}
            </label>
            <input
              type="file"
              id="fileInput"
              name="Avatar"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeUpdatedUser}
            required
          />
          <label>Nhập lại mật khẩu mới</label>
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmpassword"
            onChange={onChangeUpdatedUser}
            required
          />

          <button
            className="settingsSubmitButton"
            type="submit"
          >
            Cật nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
