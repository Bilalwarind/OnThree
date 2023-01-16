import React, { Component } from "react";
import { Alert } from "react-native";
import { baseUrl } from "../baseUrl";
import {
  DATA_FAILED,
  DATA_LOADING,
  ADD_PHONE,
  NOTIFICATIONS,
  DASHBOARD,
  NOTIFICATIONS_LIST,
} from "./types";

export const getUserData2 = (token, id) => {
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("getuserdata", { user_id: id, token: token })
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
export const removeProfilePhoto = (data, token, id) => {
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("removeprofilepicture", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch(getUserData2(token, id));
          Alert.alert(res?.data?.message);
        } else {
          const err = res?.data?.data?.error?.image;
          err.map((e) => Alert.alert(e));
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
export const changeProfilePhoto = (data, token, id) => {
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("addprofilepicture", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch(getUserData2(token, id));
        } else {
          const err = res?.data?.data?.error?.image;
          err.map((e) => Alert.alert(e));
        }
      })
      .catch((err) => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard."
        );
      });
  };
};
export const addPhones = (data, phoneId, nav) => {
  // alert(JSON.stringify(data));
  const endPoint = phoneId === "" ? "addPhoneNumber" : "updatePhone";
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post(endPoint, data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          nav.navigate("PhoneOtp", {
            phone: res?.data?.data?.user?.phone_number,
            id: phoneId,
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
export const phoneDetails = (data, id, title, desc, nav) => {
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    return baseUrl
      .post("unsaveSingleNumVerify", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          nav.navigate("Envoyer", {
            id: id,
            phone: res.data.data.user.phone_number,
            name: res.data.data.user.full_name,
            title: title,
            desc: desc,
            img: res.data.data.user.profile_pic,
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
export const addEmails = (data, emailId, nav) => {
  // alert(JSON.stringify(data));
  const endPoint = emailId === "" ? "addMoreEmails" : "updateEmail";
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post(endPoint, data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          nav.navigate("EmailOtp", {
            email: res?.data?.data?.user?.email,
            id: emailId,
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
export const notificationsList = (data) => {
  // alert(JSON.stringify(data));
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("showAllNotification", data)
      .then(async (res) => {
        // alert(JSON.stringify(res?.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: NOTIFICATIONS_LIST,
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
export const readNotification = (data) => {
  // alert(JSON.stringify(data));
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("readNotification", data)
      .then(async (res) => {
        // alert(JSON.stringify(res?.data));
        if (res?.data?.success === 1) {
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
export const upDateName = (data, nav) => {
  return (dispatch) => {
    // dispatch({
    //   type: DATA_LOADING,
    // });
    baseUrl
      .post("updateprofile", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          nav.navigate("ProfileDetails");
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
export const getPhones = (data) => {
  return (dispatch) => {
    dispatch({
      type: DATA_LOADING,
    });
    baseUrl
      .post("getPhonesEmails", data)
      .then(async (res) => {
        // alert(JSON.stringify(res.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: ADD_PHONE,
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
export const otpVerificationPhone = (data, phone, userId, id, token, nav) => {
  return (dispatch) => {
    baseUrl
      .post("otpverify", data)
      .then(async (res) => {
        // alert(JSON.stringify(res?.data));
        if (res?.data?.success === 1) {
          dispatch(registerMultiPhones(phone, userId, id, token, nav));
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
export const otpVerificationEmail = (data, email, userId, id, token, nav) => {
  return (dispatch) => {
    baseUrl
      .post("otpverify", data)
      .then(async (res) => {
        // alert(JSON.stringify(res?.data));
        if (res?.data?.success === 1) {
          dispatch(registerMultiEmails(email, userId, id, token, nav));
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
export const registerMultiEmails = (email, userId, id, token, nav) => {
  const endPoint = id === "" ? "registerMoreEmails" : "saveUpdatedEmail";
  return (dispatch) => {
    baseUrl
      .post(endPoint, {
        user_id: userId,
        id: id,
        token: token,
        email: email,
      })
      .then(async (res) => {
        // alert(JSON.stringify(res?.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: ADD_PHONE,
            payload: res?.data?.data,
          });
          nav.goBack();
          Alert.alert(res?.data?.message);
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
export const registerMultiPhones = (phone, userId, id, token, nav) => {
  const endPoint = id === "" ? "registerMoreNumber" : "saveUpdatedNumber";
  return (dispatch) => {
    baseUrl
      .post(endPoint, {
        user_id: userId,
        id: id,
        token: token,
        phone_number: phone,
      })
      .then(async (res) => {
        // alert(JSON.stringify(res?.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: ADD_PHONE,
            payload: res?.data?.data,
          });
          nav.goBack();
          Alert.alert(res?.data?.message);
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
export const getNotifications = (data) => {
  return (dispatch) => {
    baseUrl
      .post("notificationSettings", data)
      .then(async (res) => {
        // alert(JSON.stringify(res?.data));
        if (res?.data?.success === 1) {
          dispatch({
            type: NOTIFICATIONS,
            payload: res?.data?.data?.notifications?.notification_switches,
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
