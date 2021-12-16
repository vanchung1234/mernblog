import React from 'react';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';
import Alert from '../layouts/Alert';
import axios from 'axios';
import { apiUrl } from '../../contexts/constant';
const AddPost = () => {
  const [alert, setAlert] = useState(null);
  const [file, setFile] = useState(null);
  const { addPost } = useContext(PostContext);
  const [newPost, setNewPost] = useState({
    name: '',
    desc: '',
    categories: '',
  });
  const { name, desc, categories } = newPost;
  const onChangeNewPostForm = (event) =>
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  const resetForm = () => {
    setNewPost({
      name: '',
      desc: '',
      categories: '',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      name,
      categories,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post(`${apiUrl}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const addData = await addPost(newPost);
      if (addData) {
        setAlert({
          type: 'success',
          message: addData.message,
        });
        setTimeout(() => setAlert(null), 3000);
        resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="write">
        <Alert info={alert} />

        {file && (
          <img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
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
              onChange={onChangeNewPostForm}
              value={name}
            />
            <select
              name="categories"
              value={categories}
              onChange={onChangeNewPostForm}
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
              onChange={onChangeNewPostForm}
              value={desc}
            ></textarea>
          </div>
          <button className="writeSubmit" type="submit">
            Tải lên
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPost;
