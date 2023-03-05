import {Alert} from 'react-native';
import baseUrl from '../baseUrl';
import {
  PROFILE_SUCCESS,
  ALL_USER_LIST_SUCCESS,
  ALL_STORIES_SUCCESS,
  USER_STORIES_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
} from '../actions/types';
import axios from 'axios';
import {json} from 'stream/consumers';

export const addStory = (data, token, nav) => {
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
        console.log('res', res?.data);
        Alert.alert('Upload Story', res?.data?.message, [
          {text: 'OK', onPress: () => nav.goBack()},
        ]);
        return res;
      })
      .catch(e => {
        alert(res?.data?.message);
        console.log('e', e);
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
        if (res.data.success !== 0) {
          dispatch({
            type: PROFILE_SUCCESS,
            payload: res?.data?.data?.user,
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
export const userAllStories = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('get-user-all-stories', data)
      .then(async res => {
        console.log('res', res?.data?.data?.stories);
        // alert(JSON.stringify(res.data.data.stories));
        if (res.data.success !== 0) {
          dispatch({
            type: USER_STORIES_SUCCESS,
            payload: res?.data?.data?.stories,
          });
        }
      })
      .catch(err => {
        console.log('err', err);
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const userBookMarkedStories = data => {
  console.log('data', data);
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('get-user-bookmark-stories', data)
      .then(async res => {
        if (res?.data?.success !== 0) {
          dispatch({
            type: USER_STORIES_SUCCESS,
            payload: res?.data?.data?.stories,
          });
        }
      })
      .catch(err => {
        console.log('err', err);
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const userProfileUpdate = (data, nav) => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('profile-update', data)
      .then(async res => {
        alert(JSON.stringify(res.data));
        // Alert.alert(res.data.message);
        nav.navigate('Profile');
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
        console.log('first', res.data.data.user);
        // alert(JSON.stringify(res.data.data.user[1].liked_story));
        if (res.data.success !== 0) {
          dispatch({
            type: ALL_STORIES_SUCCESS,
            payload: res?.data?.data?.user,
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

export const getAllUserList = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('users-list', data)
      .then(async res => {
        if (res.data.success !== 0) {
          dispatch({
            type: ALL_USER_LIST_SUCCESS,
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
export const likeStory = data => {
  return dispatch => {
    // dispatch({
    //   type: DATA_LOADING,
    // });
    baseUrl
      .post('add-likes', data)
      .then(async res => {
        alert(res?.data?.message);
      })
      .catch(err => {
        alert(err?.message);
        // dispatch({
        //   type: DATA_FAILED,
        // });
      });
  };
};
export const commentsStory = data => {
  return dispatch => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post('add-comment', data)
      .then(async res => {
        alert(JSON.stringify(res.data));
        // if (res.data.success !== 0) {
        //   dispatch({
        //     type: ALL_STORIES_SUCCESS,
        //     payload: res.data.data.user,
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
