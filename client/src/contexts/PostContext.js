import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/postReducer';
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from './constant';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //State
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  //get my post
  const getMyPosts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/post/mypost`
      );
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  const getAllPost = async (search) => {
    try {
      const response = await axios.get(
        `${apiUrl}/post` + search
      );
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  const getPost = async (postId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/post/${postId}`
      );
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.post,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  //Add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(
        `${apiUrl}/post`,
        newPost
      );
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  //delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/post/${postId}`
      );
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //find post when user is updating post
  const findPost = (postId) => {
    const post = postState.posts.find(
      (post) => post._id === postId
    );
    dispatch({ type: FIND_POST, payload: post });
  };

  //update post
  const updatePost = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/post/${updatePost._id}`,
        updatePost
      );
      if (response.data.success)
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  const postContextData = {
    postState,
    getMyPosts,
    getAllPost,
    getPost,
    addPost,
    deletePost,
    findPost,
    updatePost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
