import React from 'react';
import {
  createContext,
  useReducer,
  useEffect,
} from 'react';
import { authReducer } from '../reducers/authReducer';
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN_NAME,
} from './constant';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //authenticate user

  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const res = await axios.get(`${apiUrl}/auth`);
      if (res.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: res.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  useEffect(() => loadUser(), []);

  //login

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        userForm
      );
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else
        return { success: false, message: error.message };
    }
  };

  //register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        userForm
      );
      if (response.data.success) {
        return {
          success: true,
          message: 'Tạo tài khoản thành công',
        };
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else
        return { success: false, message: error.message };
    }
  };

  //update User
  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `${apiUrl}/user/${updatedUser._id}`,
        updatedUser
      );
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  //log out
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: 'SET_AUTH',
      payload: { isAuthenticated: false, user: null },
    });
  };

  //context data
  const authContextData = {
    loginUser,
    registerUser,
    logoutUser,
    authState,
    updateUser,
  };

  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
