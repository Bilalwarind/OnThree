import React, {Component} from 'react';
import {Alert} from 'react-native';
import {baseUrl} from '../baseUrl';
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
} from '../actions/types';

export const phoneVerification = (data, count) => {
  return dispatch => {
    baseUrl
      .post('enternumber', data)
      .then(async res => {
        alert(JSON.stringify(res.data));
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
      .catch(err => {
        Alert.alert(
          "Oups, quelque chose s'est mal passé. Veuillez réessayer plus tard.",
        );
      });
  };
};
