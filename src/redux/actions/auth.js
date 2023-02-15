import {Alert} from 'react-native';
import baseUrl from '../baseUrl';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
} from '../actions/types';

export const registerUser = (data, nav) => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('mobilesignup', data)
      .then(async res => {
        if (res?.data?.success !== 0) {
          Alert.alert(res?.data?.message);
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res?.data?.data,
          });
          nav.navigate('StoryPlay');
        } else {
          Alert.alert(res?.data?.message);
          dispatch({
            type: DATA_FAILED,
          });
        }
      })
      .catch(err => {
        Alert.alert('Something went wrong');
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const loginUser = (data, nav) => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('mobilelogin', data)
      .then(async res => {
        // alert(JSON.stringify(res));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res?.data?.data?.user,
        });
        nav.navigate('StoryPlay');
      })
      .catch(err => {
        Alert.alert('Email or password is wrong');
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const logoutUser = nav => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    nav.navigate('Login');
  };
};
