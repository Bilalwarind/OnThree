import React, { Component } from "react";
import { Alert } from "react-native";
import { baseUrl } from "../baseUrl";
import {
  LOGIN_SUCCESS,
  PHONE_SUCCESS,
  DATA_FAILED,
  DATA_LOADING,
  PROGRESS_SUCCESS,
  EMAIL_SUCCESS,
  F_NAME_SUCCESS,
  L_NAME_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
  PROGRESS_PREVIOUS,
} from "../actions/types";

export const phoneVerification = (data, count) => {
  return (dispatch) => {
    baseUrl
      .post("enternumber", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: PROGRESS_SUCCESS,
            payload: count,
          });
          dispatch({
            type: PHONE_SUCCESS,
            payload: res?.data?.data,
          });
        } else {
          Alert.alert(res?.data?.message);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
export const otpVerification = (data, count) => {
  return (dispatch) => {
    baseUrl
      .post("otpverify", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: PROGRESS_SUCCESS,
            payload: count,
          });
        } else {
          Alert.alert(res?.data?.message);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
export const emailVerification = (data, count) => {
  return (dispatch) => {
    // alert(JSON.stringify(data));
    dispatch({
      type: EMAIL_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PROGRESS_SUCCESS,
      payload: count,
    });
  };
};
export const progressPrevious = (count) => {
  return (dispatch) => {
    dispatch({
      type: PROGRESS_PREVIOUS,
      payload: count,
    });
  };
};
export const nameVerification = (fname, lname, count) => {
  return (dispatch) => {
    // alert(JSON.stringify(data));
    dispatch({
      type: F_NAME_SUCCESS,
      payload: fname,
    });
    dispatch({
      type: L_NAME_SUCCESS,
      payload: lname,
    });
    dispatch({
      type: PROGRESS_SUCCESS,
      payload: count,
    });
  };
};

export const registerUser = (data, nav) => {
  return (dispatch) => {
    baseUrl
      .post("mobileregister", data)
      .then(async (res) => {
        if (res?.data?.success === 1) {
          nav.navigate("SuccessUser");
          dispatch({
            type: REGISTER_FAILED,
          });
        } else {
          Alert.alert(res?.data?.message);
          dispatch({
            type: REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
export const loginUser = (data) => {
  console.log("data", data);
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("mobilelogin", data)
      .then(async (res) => {
        if (res?.data?.success === 1) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res?.data?.data?.user,
          });
        } else {
          Alert.alert(res?.data?.message);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res?.data?.data?.user,
          });
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
        dispatch({
          type: DATA_FAILED,
        });
      });
  };
};
export const logoutUser = (data) => {
  return (dispatch) => {
    baseUrl
      .post("mobilelogout", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: LOGOUT,
          });
          Alert.alert(res?.data?.message);
        } else {
          Alert.alert(res?.data?.data?.error);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
