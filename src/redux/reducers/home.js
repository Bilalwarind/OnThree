import {
  PROFILE_SUCCESS,
  ALL_USER_LIST_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
  ALL_STORIES_SUCCESS,
  USER_STORIES_SUCCESS,
} from '../actions/types';
const initialState = {
  userProfile: '',
  isLoading: false,
  allStoriesData: '',
  userStoriesData: '',
  allUserList: '',
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DATA_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ALL_STORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allStoriesData: action?.payload,
      };
    case USER_STORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userStoriesData: action?.payload,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: action?.payload,
      };
    case ALL_USER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUserList: action?.payload,
      };

    default:
      return state;
  }
};
