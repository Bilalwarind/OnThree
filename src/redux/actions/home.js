import {Alert} from 'react-native';
import baseUrl from '../baseUrl';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
} from '../actions/types';

export const addStory = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('add-story', data)
      .then(async res => {
        alert(JSON.stringify(res));
        // if (res.data.success !== 0) {
        //   dispatch({
        //     type: ADD_STORY_SUCCESS,
        //     payload: res.data.data.user,
        //   });
        // } else {
        //   Alert.alert('There is a problem with your email or password!');
        //   dispatch({
        //     type: DATA_FAILED,
        //   });
        // }
      })
      .catch(err => {
        alert(JSON.stringify(err));
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
// export const forgetPassword = data => {
//   return dispatch => {
//     dispatch({
//       type: DATA_LOADING,
//     });
//     const res = baseUrl.post('forgotpassword', data);
//     if (res.success !== 0) {
//       dispatch({
//         type: DATA_FAILED,
//       });
//     } else {
//       dispatch({
//         type: DATA_FAILED,
//       });
//     }
//     return res;
//   };
// };
