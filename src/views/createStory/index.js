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
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../utils/';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../redux';
import CustomTextInput from '../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CreateStory = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [activeBtn, setActiveBtn] = useState(1);
  const [camMode, setCamMode] = useState('front');
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
  const openGallery = async () => {
    // toggleModal();
    let options = {
      mediaType: 'video',
      // cameraType: mode,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      // durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
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

        const data = {
          uri: response?.assets[0]?.uri,
          name: `test.jpg`,
          type: response?.assets[0]?.type,
        };

        nav.replace('PublishStory', {videoData: data});
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.row1}>
        <View style={styles.header2}>
          <CustomText
            title="Add Story"
            textcolor={color.primary}
            fontsize={Size(2.2)}
            aligntext={'center'}
            marginvertical={hp(0.5)}
            fontfamily={familyFont.semiBold}
          />
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              nav.goBack();
            }}>
            <AntDesign name="close" size={22} color={color.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.topTab}>
          <CustomButton
            title="Front-Facing"
            fontsize={Size(1.4)}
            backgroundcolor={activeBtn == 1 ? color.white : color.gray}
            borderradius={hp(1)}
            textcolor={color.primary}
            padding={hp(1)}
            textalign="center"
            paddinghori={hp(2)}
            flexdirection="row"
            justifycontent="center"
            alignitems="center"
            width={wp(42)}
            fontfamily={familyFont.semiBold}
            onpress={() => {
              setActiveBtn(1);
              setCamMode('front');
            }}
          />
          <CustomButton
            title="Rear-Facing"
            fontsize={Size(1.4)}
            backgroundcolor={activeBtn == 2 ? color.white : color.gray}
            borderradius={hp(1)}
            textcolor={color.primary}
            padding={hp(1)}
            textalign="center"
            paddinghori={hp(2)}
            flexdirection="row"
            justifycontent="center"
            alignitems="center"
            width={wp(42)}
            fontfamily={familyFont.semiBold}
            onpress={() => {
              setActiveBtn(2);
              setCamMode('back');
            }}
          />
        </View>
        <View style={styles.story} />
        <CustomText
          title="Video counts down from 3"
          textcolor={color.primary}
          fontsize={Size(1.4)}
          aligntext={'center'}
          marginTop={hp(4)}
          fontfamily={familyFont.reg}
        />
        <CustomButton
          title="Record Video"
          fontfamily={familyFont.semiBold}
          fontsize={Size(2.1)}
          backgroundcolor={color.primary}
          borderradius={hp(1)}
          textcolor={color.white}
          padding={hp(2)}
          textalign="center"
          marginvertical={hp(3)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          onpress={() => {
            nav.navigate('RecordStory', { camType: camMode });
          }}
          Icon={<Feather name="video" size={19} color={color.white} />}
        />
        <CustomButton
          title="Upload Video"
          fontfamily={familyFont.semiBold}
          fontsize={Size(1.7)}
          textcolor={color.primary}
          textalign="center"
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          onpress={() => {
            openGallery();
          }}
        />
      </ScrollView>
      {/* <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog> */}
    </View>
  );
};

export default CreateStory;
