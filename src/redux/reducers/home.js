import {ADD_STORY_SUCCESS, DATA_FAILED, DATA_LOADING} from '../actions/types';
const initialState = {
  isLoading: false,
  token: '',
  userId: '',
  userData: null,
  isLoading: false,
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
    case ADD_STORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
