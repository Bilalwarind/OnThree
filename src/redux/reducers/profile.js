import {
  DATA_FAILED,
  DATA_LOADING,
  ADD_PHONE,
  NOTIFICATIONS,
  NOTIFICATIONS_LIST,
} from "../actions/types";

const initialState = {
  phoneList: "",
  notifications: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  errMsg: null,
  notifications_list: "",
};

export const profileReducer = (state = initialState, action) => {
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
        errMsg: action.payload,
      };

    case ADD_PHONE:
      return {
        ...state,
        phoneList: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case NOTIFICATIONS_LIST:
      return {
        ...state,
        notifications_list: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };

    default:
      return state;
  }
};
