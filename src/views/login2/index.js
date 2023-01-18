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
import {wp, hp, Size, color, Images, IOS} from '../../utils/';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../redux';
import CustomTextInput from '../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const onRegister = async () => {
    if (password.length <= 0) {
      setIsError(true);
    }

    // const data = new FormData();
    // data.append('phone_number', phone);
    // data.append('password', pass);
    // data.append('device_token', token);
    // dispatch(loginUser(data));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <View style={{marginVertical: hp(5), alignItems: 'center'}}>
        <Image style={styles.logo} source={Images.logo} resizeMode="contain" />
      </View>
      <View style={{height: hp(10), justifyContent: 'center'}}>
        <CustomText
          title={'Email'}
          textcolor={color.primary}
          fontSize={16}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter your email'}
          placeholderStyle={{fontWeight: 'bold'}}
          borderradius={hp(1.5)}
          bgcolor={color.gray}
          paddinghorizontal={hp(2)}
          // onchangetext={text => {
          //   setEmail(text);
          // }}
          value="hisaeedahmad@gmail.com"
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
      </View>
      <View style={{height: hp(15), justifyContent: 'center'}}>
        <CustomText
          title={'Password'}
          textcolor={isError ? color.red : color.primary}
          fontSize={16}
          aligntext={'left'}
          marginleft={wp(2)}
          marginvertical={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter your password'}
          borderradius={hp(1.5)}
          bgcolor={color.gray}
          secureTextEntry={true}
          paddinghorizontal={hp(2)}
          bordercolor="red"
          borderwidth={isError ? 1 : 0}
          onchangetext={val => {
            setPassword(val);
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
            fontsize={Size(1.5)}
            aligntext={'left'}
            marginleft={wp(2)}
          />
        )}
      </View>
      <CustomText
        title={'Forgot Password?'}
        textcolor={color.primary}
        fontSize={25}
        aligntext={'left'}
        marginleft={wp(2)}
        marginvertical={hp(3)}
      />
      <CustomButton
        title="Log In"
        fontfamily="Poppins-Bold"
        fontsize={Size(1.9)}
        backgroundcolor={color.primary}
        borderradius={hp(1)}
        textcolor={color.white}
        padding={hp(1.5)}
        fontweight="bold"
        textalign="center"
        marginvertical={hp(3)}
        onpress={() => {
          onRegister();
        }}
      />
      <CustomButton
        title="Create Account"
        fontfamily="Poppins-Bold"
        fontsize={Size(1.9)}
        backgroundcolor={color.white}
        borderradius={hp(1)}
        textcolor={color.primary}
        padding={hp(1)}
        textalign="center"
        fontweight="bold"
        marginvertical={hp(1)}
        onpress={() => {
          onRegister();
        }}
      />
      <CustomButton
        title="or, Log In with"
        fontfamily="Poppins-Bold"
        fontsize={Size(1.2)}
        backgroundcolor={color.white}
        borderradius={hp(1)}
        textcolor={color.primary}
        padding={hp(1)}
        textalign="center"
        onpress={() => {
          onRegister();
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(5),
        }}>
        <View style={styles.socialIcon}>
          <AntDesign name="apple1" size={30} color={color.white} />
        </View>
        <View style={styles.socialIcon}>
          <AntDesign name="google" size={30} color={color.white} />
        </View>
      </View>
      <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

export default Login;
