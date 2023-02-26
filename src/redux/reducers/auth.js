import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
} from '../actions/types';
const initialState = {
  isLoading: false,
  token: '',
  userId: '',
  userData: null,
};

export const authReducer = (state = initialState, action) => {
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
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action?.payload,
        token: action?.payload?.token,
        userId: action?.payload?.id,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        token: null,
        userId: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
