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
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../../utils/';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {DATA_FAILED, LOGOUT_SUCCESS} from '../../../redux/actions/types';
import appleAuth from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isError2, setIsError2] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '787743984476-mvfiqqhoi8sit56dgc9agekskuve0iro.apps.googleusercontent.com',
    });
    dispatch({
      type: DATA_FAILED,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
      isLoading: false,
      payload: null,
    });
  }, []);
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

    const data = {
      email: email,
      password: password,
    };
    dispatch(loginUser(data, nav));
  };
  const googlelogin = async () => {
    try {
      const {idToken, user} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      console.log('user', user);
      const data = {
        email: user?.email,
        password: 'onthree',
        login_type: 'google',
      };
      dispatch(loginUser(data, nav));
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
    };
    dispatch(loginUser(data, nav));

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
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Image style={styles.logo} source={Images.logo} resizeMode="contain" />

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
        onchangetext={text => {
          setEmail(text);
          setIsError(false);
        }}
        paddingverti={Platform.OS === 'android' ? hp(0.3) : hp(2.3)}
      />
      {isError && (
        <CustomText
          title={
            'There is a problem with your email or password. Try again, or reset your password.'
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
        secureTextEntry={true}
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
            'There is a problem with your email or password. Try again, or reset your password.'
          }
          textcolor={color.red}
          fontsize={Size(1.3)}
          fontfamily={familyFont.reg}
          marginleft={wp(2)}
          marginTop={wp(1)}
        />
      )}
      <CustomButton
        title="Forgot Password?"
        fontsize={Size(1.7)}
        textcolor={color.primary}
        fontfamily={familyFont.reg}
        borderradius={hp(1)}
        marginvertical={hp(3)}
        marginleft={wp(2)}
        onpress={() => nav.navigate('ForgetPassword')}
      />
      <CustomButton
        title="Log In"
        fontsize={Size(2.1)}
        textcolor={color.white}
        fontfamily={familyFont.semiBold}
        backgroundcolor={color.primary}
        borderradius={hp(1)}
        padding={hp(2)}
        textalign="center"
        marginbottom={hp(4)}
        onpress={onRegister}
      />
      <CustomButton
        title="Create Account"
        fontsize={Size(1.7)}
        textcolor={color.primary}
        fontfamily={familyFont.semiBold}
        textalign="center"
        onpress={() => {
          nav.navigate('Register');
        }}
      />
      <CustomText
        title={'or, Log In with'}
        fontsize={Size(1.5)}
        textcolor={color.primary}
        fontfamily={familyFont.reg}
        aligntext={'center'}
        marginTop={hp(5)}
      />
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
    </View>
  );
};

export default Login;
