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
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import styles from './style';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);

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
    dispatch(loginUser(data));
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
        title={'Forgot Password'}
        fontsize={Size(2.2)}
        textcolor={color.primary}
        fontfamily={familyFont.reg}
        aligntext="center"
        marginvertical={hp(2)}
      />
      {!show ? (
        <View>
          <View style={styles.input}>
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
              bgcolor={color.gray}
              paddinghorizontal={hp(2)}
              bordercolor="red"
              borderwidth={isError ? 1 : 0}
              onchangetext={text => {
                setEmail(text);
                setIsError(false);
              }}
              paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
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
          </View>

          <CustomButton
            title="Request Reset"
            fontsize={Size(2.1)}
            textcolor={color.white}
            fontfamily={familyFont.semiBold}
            backgroundcolor={color.primary}
            borderradius={hp(1)}
            padding={hp(2.2)}
            fontweight="bold"
            textalign="center"
            marginvertical={hp(5)}
            onpress={onRegister}
          />
        </View>
      ) : (
        <View>
          <CustomText
            title={'Check your email for a reset link'}
            fontsize={Size(1.8)}
            textcolor={color.primary}
            fontfamily={familyFont.reg}
            aligntext={'center'}
          />
          <CustomButton
            title="Back to Log In"
            fontsize={Size(2.1)}
            textcolor={color.white}
            fontfamily={familyFont.semiBold}
            backgroundcolor={color.primary}
            borderradius={hp(1)}
            padding={hp(2.2)}
            fontweight="bold"
            textalign="center"
            marginvertical={hp(5)}
            onpress={onRegister}
          />
        </View>
      )}
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

export default ForgetPassword;
