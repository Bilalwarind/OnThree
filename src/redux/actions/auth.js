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
            type: LOGIN_SUCCESS,
            payload: res?.data?.data?.user,
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
    baseUrl
      .post('mobilelogin', data)
      .then(async res => {
        if (res.data.success !== 0) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data.user,
          });
          nav.navigate('StoryPlay');
        } else {
          Alert.alert('There is a problem with your email or password!');
          dispatch({
            type: DATA_FAILED,
          });
        }
      })
      .catch(err => {
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const forgetPassword = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    const res = baseUrl.post('forgotpassword', data);
    if (res.success !== 0) {
      dispatch({
        type: DATA_FAILED,
      });
    } else {
      dispatch({
        type: DATA_FAILED,
      });
    }
    return res;
  };
};
export const logoutUser = nav => {
  return dispatch => {
    dispatch({
      type: DATA_FAILED,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
      isLoading: false,
      payload: null,
    });
  };
};
