import {
  DATA_FAILED,
  DATA_LOADING,
  DASHBOARD,
  PHONE_ACCOUNT,
  PAYMENT_METHODS,
  RECENT_TRANSACTIONS,
  MERCHANT_CODE,
} from "../actions/types";

const initialState = {
  userData: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  errMsg: null,
  phoneAccount: [],
  paymentMethods: [],
  recentTransactions: [],
  merchantCode: "",
};

export const homeReducer = (state = initialState, action) => {
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

    case DASHBOARD:
      return {
        ...state,
        userData: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case PHONE_ACCOUNT:
      return {
        ...state,
        phoneAccount: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case MERCHANT_CODE:
      return {
        ...state,
        merchantCode: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case RECENT_TRANSACTIONS:
      return {
        ...state,
        recentTransactions: action?.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };

    default:
      return state;
  }
};
