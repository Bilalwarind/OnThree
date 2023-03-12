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
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../../utils/';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {userProfileUpdate} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './style';
import baseUrl from '../../../redux/baseUrl';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [img, setImg] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [about, setAbout] = useState('');
  const {token, userId, userData} = useSelector(state => state.auth);
  const {isLoading} = useSelector(state => state.home);
  useEffect(() => {
    setFname(userData?.first_name);
    setLname(userData?.last_name);
    setImg(userData?.image);
    setAbout(userData?.about);
  }, []);
  const onRegister = async () => {
    const formdata = new FormData();
    formdata.append('token', token);
    formdata.append('user_id', userId);
    formdata.append('first_name', fname);
    formdata.append('last_name', lname);
    formdata.append('about', about);
    formdata.append('url', img?.uri);
    formdata.append('image', img);
    formdata.append('image', {
      uri: img?.uri,
      type: img?.type,
      name: Math.floor(Math.random() * 100) + 1 + 'photo.jpg',
    });

    // const formdata = {
    //   token: token,
    //   user_id: userId,
    //   first_name: fname,
    //   last_name: lname,
    //   about: about,
    //   url: img?.uri,
    //   image: img?.uri,
    // };

    dispatch(userProfileUpdate(formdata, nav));
  };

  const chooseFile = type => {
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
      setImg({
        uri: response?.assets[0]?.uri,
        name: `${response?.assets[0]?.uri}test.jpg`,
        type: response?.assets[0]?.type,
      });
      // const data = new FormData();
      // data.append('user_id', userId);
      // data.append('token', token);
      // data.append('image', {
      //   uri: response?.assets[0]?.uri,
      //   name: `test.jpg`,
      //   type: response?.assets[0]?.type,
      // });
      // dispatch(changeProfilePhoto(data, token, userId));
    });
  };
  const deletePhoto = () => {
    Alert.alert(
      'Remove Photo?',
      "Once it's gone you can't got it back",
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setImg(null);
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.row1}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}>
          <View style={styles.header}>
            <CustomText
              title={'Cancel'}
              textcolor={color.primary}
              fontsize={Size(1.7)}
              fontfamily={familyFont.reg}
              aligntext={'center'}
              marginvertical={hp(3)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegister} style={styles.header1}>
          <CustomText
            title={'Save'}
            textcolor={color.primary}
            fontsize={Size(1.7)}
            fontfamily={familyFont.bold}
            aligntext={'center'}
            marginvertical={hp(3)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row1}>
        <View style={styles.header2}>
          <Image
            style={styles.profile}
            source={{
              uri:
                img?.uri ||
                'https://icon-library.com/images/user-profile-icon/user-profile-icon-24.jpg',
            }}
          />
          {img ? (
            <TouchableOpacity onPress={deletePhoto}>
              <AntDesign name="delete" size={20} color={color.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => chooseFile('photo')}>
              <AntDesign name="pluscircleo" size={20} color={color.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
        <CustomText
          title={'First Name'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
          marginTop={hp(3)}
        />
        <CustomTextInput
          placeholder={'Enter first name'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(1)}
          value={fname}
          onchangetext={val => setFname(val)}
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
        <CustomText
          title={'Last Name'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
          marginTop={hp(2)}
        />
        <CustomTextInput
          placeholder={'Enter last name'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(1)}
          value={lname}
          onchangetext={val => setLname(val)}
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
        <CustomText
          title={'About'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
          marginTop={hp(2)}
        />
        <CustomTextInput
          placeholder={'Explain about yourself'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(1)}
          numberOfLines={3}
          multiline={true}
          value={about}
          onchangetext={val => setAbout(val)}
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
        <CustomText
          title={'URL'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
          marginTop={hp(2)}
        />
        <CustomTextInput
          placeholder={'Enter URL'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(1)}
          onchangetext={text => {}}
          value={img?.uri}
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            paddingTop: hp(50),
            backgroundColor: 'rgba(245, 245, 245, 0.7)',
            width: wp(100),
            height: hp(100),
          }}>
          <ActivityIndicator
            animating={true}
            color={color.primary}
            size="large"
          />
        </View>
      )}
    </View>
  );
};

export default UpdateProfile;
