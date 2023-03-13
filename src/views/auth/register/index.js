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
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../../utils/';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {registerUser} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';
import {SafeAreaView} from 'react-native-safe-area-context';
import appleAuth from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const Register = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isError, setIsError] = useState(false);
  const [isError2, setIsError2] = useState(false);
  const [isError3, setIsError3] = useState(false);
  const [userName, setUserName] = useState('');

  const onRegister = async () => {
    Keyboard.dismiss();
    if (email.length <= 0) {
      setIsError(true);
      return;
    }
    if (email.length > 0 && password.length <= 0) {
      setIsError2(true);
      return;
    }
    if (password !== passwordConfirm) {
      setIsError3(true);
      return;
    }

    const data = {
      email: email,
      password: password,
      confirm_password: passwordConfirm,
      first_name: userName,
      last_name: '',
      phone: '',
    };
    dispatch(registerUser(data, nav));
  };
  const googlelogin = async () => {
    try {
      const {idToken, user} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      const data = {
        email: user?.email,
        password: 'onthree',
        login_type: 'google',
        first_name: user?.name,
        last_name: '',
        phone: '',
      };
      dispatch(registerUser(data, nav));
      // return this.props.navigation.navigate('RegisterChangeProfile', {
      //   // email: responseJson.email,
      //   // mode: responseJson.mode,
      //   // mobile: responseJson.mobile,
      //   mode: 'google',
      //   level: 0,
      //   latitude: 0.0,
      //   longitude: 0.0,
      //   mobile: 0,
      //   customerName: user?.name,
      //   building: null,
      //   unit: 0,
      //   postal: 0,
      //   email: user?.email,
      //   type: 'google',
      // });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert(error);

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        alert(error);
      } else {
        // some other error happened
        alert(error);
      }
    }
  };
  const applelogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('signed in', appleAuthRequestResponse);
    console.log(appleAuthRequestResponse.email);
    var user_email = appleAuthRequestResponse.email;
    const data = {
      email: user_email,
      password: 'onthree',
      login_type: 'apple',
      first_name: appleAuthRequestResponse.fullName.givenName,
      last_name: '',
      phone: '',
    };
    dispatch(registerUser(data, nav));

    // this.props.navigation.navigate('RegisterChangeProfile', {
    //   // email: responseJson.email,
    //   // mode: responseJson.mode,
    //   // mobile: responseJson.mobile,
    //   mode: 'apple',
    //   level: 0,
    //   latitude: 0.0,
    //   longitude: 0.0,
    //   mobile: 0,
    //   customerName: appleAuthRequestResponse.fullName.givenName,
    //   building: null,
    //   unit: 0,
    //   postal: 0,
    //   email: appleAuthRequestResponse.email,
    //   type: 'apple',
    // });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      //alert(JSON.stringify(appleAuthRequestResponse));
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <TouchableOpacity
            onPress={() => nav.navigate('Login')}
            style={styles.close}>
            <AntDesign name="close" size={25} color={color.primary} />
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={Images.logo}
            resizeMode="contain"
          />
          <CustomText
            title={'Create Account'}
            textcolor={color.primary}
            fontsize={Size(2.2)}
            fontfamily={familyFont.reg}
            aligntext={'center'}
            marginleft={wp(2)}
            marginbottom={hp(3)}
          />

          <CustomText
            title={'Email'}
            textcolor={isError ? color.red : color.primary}
            fontsize={Size(1.4)}
            fontfamily={familyFont.reg}
            aligntext={'left'}
            marginleft={wp(2)}
            marginbottom={wp(1)}
          />
          <CustomTextInput
            placeholder={'Enter your email'}
            fontfamily={familyFont.semiBold}
            borderradius={hp(1.5)}
            bgcolor={color.white}
            paddinghorizontal={hp(1)}
            bordercolor="red"
            borderwidth={isError ? 1 : 0}
            onchangetext={val => {
              setEmail(val);
              setIsError(false);
            }}
            paddingverti={Platform.OS === 'android' ? hp(0.3) : hp(2.3)}
          />
          {isError && (
            <CustomText
              title={
                'There is a problem with your email or password. Try again.'
              }
              textcolor={color.red}
              fontsize={Size(1.3)}
              fontfamily={familyFont.reg}
              marginleft={wp(2)}
              marginTop={wp(1)}
            />
          )}
          <CustomText
            title={'User Name'}
            textcolor={isError ? color.red : color.primary}
            fontsize={Size(1.4)}
            fontfamily={familyFont.reg}
            aligntext={'left'}
            marginleft={wp(2)}
            marginbottom={wp(1)}
            marginTop={hp(3)}
          />
          <CustomTextInput
            placeholder={'Enter your user name'}
            fontfamily={familyFont.semiBold}
            borderradius={hp(1.5)}
            bgcolor={color.white}
            paddinghorizontal={hp(1)}
            bordercolor="red"
            borderwidth={isError ? 1 : 0}
            onchangetext={val => {
              setUserName(val);
              setIsError(false);
            }}
            paddingverti={Platform.OS === 'android' ? hp(0.3) : hp(2.3)}
          />
          {isError && (
            <CustomText
              title={
                'There is a problem with your email or password. Try again.'
              }
              textcolor={color.red}
              fontsize={Size(1.3)}
              fontfamily={familyFont.reg}
              marginleft={wp(2)}
              marginTop={wp(1)}
            />
          )}
          <CustomText
            title={'Password'}
            textcolor={isError2 ? color.red : color.primary}
            fontsize={Size(1.4)}
            fontfamily={familyFont.reg}
            aligntext={'left'}
            marginleft={wp(2)}
            marginbottom={wp(1)}
            marginTop={hp(3)}
          />
          <CustomTextInput
            placeholder={'Enter your password'}
            fontfamily={familyFont.semiBold}
            borderradius={hp(1.5)}
            bgcolor={color.white}
            isSecure={true}
            paddinghorizontal={hp(1)}
            bordercolor="red"
            borderwidth={isError2 ? 1 : 0}
            onchangetext={val => {
              setPassword(val);
              setIsError2(false);
            }}
            paddingverti={Platform.OS === 'android' ? hp(0.3) : hp(2.3)}
          />
          {isError2 && (
            <CustomText
              title={
                'There is a problem with your email or password. Try again.'
              }
              textcolor={color.red}
              fontsize={Size(1.3)}
              fontfamily={familyFont.reg}
              marginleft={wp(2)}
              marginTop={wp(1)}
            />
          )}
          <CustomText
            title={'Confirm Password'}
            textcolor={isError3 ? color.red : color.primary}
            fontsize={Size(1.4)}
            fontfamily={familyFont.reg}
            aligntext={'left'}
            marginleft={wp(2)}
            marginbottom={wp(1)}
            marginTop={hp(3)}
          />
          <CustomTextInput
            placeholder={'Enter your password'}
            fontfamily={familyFont.semiBold}
            borderradius={hp(1.5)}
            bgcolor={color.white}
            isSecure={true}
            paddinghorizontal={hp(1)}
            bordercolor="red"
            borderwidth={isError3 ? 1 : 0}
            onchangetext={val => {
              setPasswordConfirm(val);
              setIsError3(false);
            }}
            paddingverti={Platform.OS === 'android' ? hp(0.3) : hp(2.3)}
          />
          {isError3 && (
            <CustomText
              title={
                'There is a problem with your email or password. Try again.'
              }
              textcolor={color.red}
              fontsize={Size(1.3)}
              fontfamily={familyFont.reg}
              marginleft={wp(2)}
              marginTop={wp(1)}
            />
          )}
          <CustomButton
            title="Create Account"
            fontsize={Size(2.1)}
            textcolor={color.white}
            fontfamily={familyFont.semiBold}
            backgroundcolor={color.primary}
            borderradius={hp(1)}
            padding={hp(2)}
            fontweight="bold"
            textalign="center"
            marginvertical={hp(5)}
            onpress={onRegister}
          />
          {false && (
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(1),
            }}>
            {Platform.OS === 'ios' && (
              <View style={styles.socialIcon}>
                <TouchableOpacity
                  onPress={() => {
                    applelogin();
                  }}>
                  <AntDesign name="apple1" size={25} color={color.white} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.socialIcon}>
              <TouchableOpacity
                onPress={() => {
                  googlelogin();
                }}>
                <AntDesign name="google" size={25} color={color.white} />
              </TouchableOpacity>
            </View>
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
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
