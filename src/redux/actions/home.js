import React, { Component } from "react";
import { Alert } from "react-native";
import { baseUrl } from "../baseUrl";
import {
  DATA_FAILED,
  DATA_LOADING,
  DASHBOARD,
  PHONE_ACCOUNT,
  PAYMENT_METHODS,
  RECENT_TRANSACTIONS,
  MERCHANT_CODE,
} from "./types";

export const getUserData = (data) => {
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("getuserdata", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data.data.user));
        if (res?.data?.success === 1) {
          dispatch({
            type: DASHBOARD,
            payload: res.data.data,
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
export const getPaymentWallet = (data, nav) => {
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("sendMoneyWallet", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          nav.navigate("Success");
        } else {
          nav.navigate("Fail", { message: res?.data?.message });
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
export const getPhoneAccount = (data) => {
  // alert(JSON.stringify(data));
  return (dispatch) => {
    baseUrl
      .post("getAllMobileNumbers", data)
      .then(async (res) => {
        if (res?.data?.success === 1) {
          // alert(JSON.stringify(res.data));
          dispatch({
            type: PHONE_ACCOUNT,
            payload: res.data.data.phoneNumberList,
          });
        } else {
          Alert.alert(res?.data);
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
export const getPaymentMethods = () => {
  return (dispatch) => {
    baseUrl
      .get("paymentMethods")
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: PAYMENT_METHODS,
            payload: res?.data?.data?.payment_methods,
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
export const getMerchanCode = (data, id, title, desc, nav) => {
  return (dispatch) => {
    baseUrl
      .post("getMerchanCode", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: MERCHANT_CODE,
            payload: res?.data?.data.merchantInfo,
          });
          let data = res.data.data.merchantInfo;
          nav.navigate("Envoyer", {
            id: id,
            phone: data.phone_number,
            name: `${data.first_name} ${data.last_name}`,
            img: data.profile_pic,
            title: title,
            desc: desc,
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
export const getResendTransactions = (data) => {
  return (dispatch) => {
    baseUrl
      .post("getInfoFromTransactions", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: RECENT_TRANSACTIONS,
            payload: res?.data?.data.all_transactions,
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
