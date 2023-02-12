import {Alert} from 'react-native';
import baseUrl from '../baseUrl';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
} from '../actions/types';

export const registerUser = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('mobilesignup', data)
      .then(async res => {
        Alert.alert(res.data.message);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch(err => {
        // Alert.alert(JSON.stringify(err));
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const loginUser = data => {
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
          payload: res.data.data.user,
        });
      })
      .catch(err => {
        // Alert.alert(JSON.stringify(err));
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
