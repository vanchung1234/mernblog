import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import { PostContext } from '../../contexts/PostContext';
import { useLocation } from 'react-router-dom';
import Alert from '../layouts/Alert';
import { apiUrl } from '../../contexts/constant';
const UpdatePost = () => {
  const { updatePost } = useContext(PostContext);
  const PF = 'http://localhost:5000/images/';
  const [file, setFile] = useState(null);
  const location = useLocation();
  const post = location.state.postState;

  const [updatedPost, setUpdatePost] = useState(post);

  const [alert, setAlert] = useState(null);

  useEffect(() => setUpdatePost(post), [post]);

  const { name, desc, categories } = updatedPost;

  const onChangeUpdatedPostForm = (event) =>
    setUpdatePost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedPost.photo = filename;
      try {
        await axios.post(`${apiUrl}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const updateData = await updatePost(updatedPost);
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
  let body;
  if (file) {
    body = (
      <img
        className="writeImg mb-2"
        src={URL.createObjectURL(file)}
        alt=""
      />
    );
  } else
    body = (
      <img
        className="writeImg mb-2"
        src={PF + post.photo}
        alt=""
      />
    );

  return (
    <>
      <div className="write">
        <Alert info={alert} />
        {body}
        <form className="writeForm" onSubmit={onSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              name="photo"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              name="name"
              placeholder={post.name}
              onChange={onChangeUpdatedPostForm}
            />
            <select
              name="categories"
              value={categories}
              onChange={onChangeUpdatedPostForm}
              value={post.categories}
            >
              <option>Thể loại</option>
              <option value="game">Game</option>
              <option value="sport">Sport</option>
              <option value="pet">Pet</option>
              <option value="study">Study</option>
            </select>
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Tell your story..."
              type="text"
              name="desc"
              className="writeInput writeText"
              placeholder={post.desc}
              onChange={onChangeUpdatedPostForm}
            ></textarea>
          </div>
          <button className="writeSubmit" type="submit">
            Cập nhật
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
