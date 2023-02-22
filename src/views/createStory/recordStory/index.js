import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../../utils/';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';

const RecordStory = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const captureImage = async type => {
    // toggleModal();
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        const data = new FormData();
        data.append('user_id', userId);
        data.append('token', token);
        data.append('image', {
          uri: response?.assets[0]?.uri,
          name: `test.jpg`,
          type: response?.assets[0]?.type,
        });
        dispatch(changeProfilePhoto(data, token, userId));
      });
    }
  };
  const chooseFile = type => {
    toggleModal();
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      const data = new FormData();
      data.append('user_id', userId);
      data.append('token', token);
      data.append('image', {
        uri: response?.assets[0]?.uri,
        name: `test.jpg`,
        type: response?.assets[0]?.type,
      });
      dispatch(changeProfilePhoto(data, token, userId));
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <CustomText
        title="3"
        textcolor={color.white}
        fontsize={Size(15)}
        aligntext={'center'}
        marginTop={hp(4)}
        fontfamily={familyFont.semiBold}
        flex={1}
        justifycontent="center"
      />
      <CustomButton
        title="Stop Recording"
        fontfamily={familyFont.semiBold}
        fontsize={Size(2.1)}
        backgroundcolor={color.white}
        borderradius={hp(1)}
        textcolor={color.primary}
        padding={hp(1.5)}
        textalign="center"
        marginvertical={hp(3)}
        flexdirection="row"
        justifycontent="center"
        alignitems="center"
        onpress={() => {
          captureImage('video');
        }}
      />
      <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

export default RecordStory;
