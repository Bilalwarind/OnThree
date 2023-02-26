import {Alert} from 'react-native';
import baseUrl from '../baseUrl';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
} from '../actions/types';
import axios from 'axios';

export const addStory = (data, token) => {
  console.log('adta', data);
  return async dispatch => {
    const res = await axios
      .post('https://theonlinetest.info/onethree/api/add-story', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log('res', res.data);
        alert('Video uploaded');
        return res;
      })
      .catch(e => {
        console.log('e', e);
        alert('Video uploaded');

        return e;
      });

    // dispatch({
    //   type: DATA_LOADING,
    //   // placesbyradius: res?.data?.data,
    // });
    return true;
  };
};
//     dispatch({
//       type: DATA_LOADING,
//     });
//     baseUrl;
//     axios
//       .post('add-story', data)
//       .then(async res => {
//         alert(JSON.stringify(res));
//         // if (res.data.success !== 0) {
//         //   dispatch({
//         //     type: ADD_STORY_SUCCESS,
//         //     payload: res.data.data.user,
//         //   });
//         // } else {
//         //   Alert.alert('There is a problem with your email or password!');
//         //   dispatch({
//         //     type: DATA_FAILED,
//         //   });
//         // }
//       })
//       .catch(err => {
//         console.log('err', err);
//         dispatch({
//           type: DATA_FAILED,
//         });
//       });
//   };
// };
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
