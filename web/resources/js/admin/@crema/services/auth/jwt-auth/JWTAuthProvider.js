import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from '../../../../shared/constants/ActionTypes';
import jwtAxios, {setAuthToken} from './index.js';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN, USER_INFO} from './../../../../configs/Constants'
import Configurations from './../../../../configs/Config'
import {
    fetchError,
    fetchStart,
    fetchSuccess,
    setLoggedInUser,
    showMessage,
} from '../../../../redux/actions';

const JWTAuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext({
  signUpUser: () => {
  },
  signInUser: () => {
  },
  logout: () => {
  },
  forgotPassword: () => {
  },
  resetPassword: () => {
  },
  socialSignin: () => {
  },
  reloadAuthUser: () => {
  },
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({children}) => {
  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get('/auth')
        .then(({data}) =>
          setJWTAuthData({
            user: data.data,
            isLoading: false,
            isAuthenticated: true,
          }),
        )
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          }),
        );
    };

    getAuthUser();
  }, []);


    /**
     *
     * @param data
     */
    const saveUserData = (data) => {
        if(data.token){
            localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
            setAuthToken(data.token);
        }
        //localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
        localStorage.setItem(USER_INFO, JSON.stringify(data));
        dispatch(setLoggedInUser(data));
        setJWTAuthData({
            user: data,
            isAuthenticated: true,
            isLoading: false,
        });
    }

    const reloadAuthUser = () => {
      jwtAxios
            .get("/auth")
            .then(({data}) => {
              //console.log('res.data', data.data);
                saveUserData(data.data);
            })
            .catch(() =>
                setJWTAuthData({
                    user: undefined,
                    isLoading: false,
                    isAuthenticated: false,
                })
            );
    };

  const signInUser = async ({email, password}) => {
    dispatch(fetchStart());
    try {
        jwtAxios.get(`${Configurations.appUrl}/sanctum/csrf-cookie`).then(async (response) => {
            const {data} = await jwtAxios.post(`${Configurations.apiUrl}/auth/signin`, {
                email,
                password,
                username: email,
            });
            const res = data.data || {}
            saveUserData(res);
            dispatch({type: FETCH_SUCCESS});
        });
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const signUpUser = async ({name, email, password}) => {
    dispatch({type: FETCH_START});
    try {
        const {data} = await jwtAxios.post('users', {name, email, password});
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      //const res = await jwtAxios.get('/auth');
      setJWTAuthData({
        user: data.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log('error:', error.response.data.error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

    const forgotPassword = async ({email}) => {
        dispatch(fetchStart());
        try {
            const {data} = await jwtAxios.post(`${Configurations.apiUrl}/auth/forgot-password/link`, {
                email,
            });
            const message = data?.message || '';
            dispatch(fetchSuccess());
            dispatch(showMessage(message));
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            dispatch(fetchError(message));
        }
    }

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
          forgotPassword,
          reloadAuthUser,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
