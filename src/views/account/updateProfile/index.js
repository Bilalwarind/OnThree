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
import styles from './style';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId} = useSelector(state => state.auth);
  const {isLoading} = useSelector(state => state.home);

  const onRegister = async () => {
    const formdata = new FormData();
    formdata.append('token', token);
    formdata.append('user_id', userId);
    formdata.append('first_name', 'Test');
    formdata.append('last_name', 'User');
    formdata.append('about', '123123123123');
    formdata.append('url', '32423423423423');
    formdata.append('image', 'https://source.unsplash.com/user/c_v_r/100×100');

    dispatch(userProfileUpdate(formdata));
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
            saveFile(item);
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
            source={Images.profile}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={deletePhoto}>
            <AntDesign name="delete" size={20} color={color.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: hp(15), justifyContent: 'center'}}>
        <CustomText
          title={'First Name'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter first name'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(2)}
          onchangetext={text => {}}
          value="McAllan"
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
      </View>
      <View style={{height: hp(13), justifyContent: 'center'}}>
        <CustomText
          title={'Last Name'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter last name'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(2)}
          onchangetext={text => {}}
          value="Megan"
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
      </View>
      <View style={{height: hp(19), justifyContent: 'center'}}>
        <CustomText
          title={'About'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Explain about yourself'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(2)}
          numberOfLines={3}
          multiline={true}
          onchangetext={text => {}}
          value="Mom, Fighter, True Believer, Sagitarius#livelaughlove"
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
      </View>
      <View style={{height: hp(12), justifyContent: 'center'}}>
        <CustomText
          title={'URL'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter URL'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(2)}
          onchangetext={text => {}}
          value="https://bit.ly/yasqueen"
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
      </View>
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
