import {Alert} from 'react-native';
import baseUrl from '../baseUrl';
import {
  PROFILE_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  ALL_STORIES_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
} from '../actions/types';
import axios from 'axios';
import {json} from 'stream/consumers';

export const addStory = data => {
  console.log('adta', data);
  return async dispatch => {
    const res = await axios
      .post(`https://theonlinetest.info/onethree/api/add-story/`, data)
      .then(res => {
        console.log('res', res?.data);
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
export const userProfileInfo = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('getuserinfo', data)
      .then(async res => {
        alert(JSON.stringify(res.data));
        if (res.data.success !== 0) {
          dispatch({
            type: PROFILE_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log('res.data', err);
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const userProfileUpdate = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('profile-update', data)
      .then(async res => {
        Alert.alert(res.data.message);
        if (res.data.success !== 0) {
          dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch(err => {
        console.log('res.data', err);
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const getAllStories = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('get-all-stories', data)
      .then(async res => {
        if (res.data.success !== 0) {
          dispatch({
            type: ALL_STORIES_SUCCESS,
            payload: res.data.data.user,
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
