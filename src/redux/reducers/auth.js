import {
  LOGIN_SUCCESS,
  LOGOUT,
  PHONE_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
  PROGRESS_SUCCESS,
  PROGRESS_PREVIOUS,
  EMAIL_SUCCESS,
  F_NAME_SUCCESS,
  L_NAME_SUCCESS,
  REGISTER_FAILED,
} from "../actions/types";
const initialState = {
  isLoggedIn: false,
  token: "",
  userId: "",
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  countProgress: 0,
  errMsg: null,
  phone: "",
  email: "",
  fname: "",
  lname: "",
  register: "",
};

export const authReducer = (state = initialState, action) => {
  // alert(JSON.stringify(action));
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errMsg: null,
      };
    case DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errMsg: action?.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action?.payload,
        token: action?.payload?.token,
        userId: action?.payload?.id,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        userId: null,
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case PROGRESS_SUCCESS:
      return {
        ...state,
        countProgress: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case PROGRESS_PREVIOUS:
      return {
        ...state,
        countProgress: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case PHONE_SUCCESS:
      return {
        ...state,
        phone: action?.payload?.user?.phone_number,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case EMAIL_SUCCESS:
      return {
        ...state,
        email: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case F_NAME_SUCCESS:
      return {
        ...state,
        fname: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case L_NAME_SUCCESS:
      return {
        ...state,
        lname: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        countProgress: 0,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };

    default:
      return state;
  }
};
