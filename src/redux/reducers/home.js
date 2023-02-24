import {
  PROFILE_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
  ALL_STORIES_SUCCESS,
} from '../actions/types';
const initialState = {
  userProfile: '',
  isLoading: false,
  allStoriesData: '',
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
    case PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: action?.payload,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // userProfile: action?.payload,
      };

    default:
      return state;
  }
};
