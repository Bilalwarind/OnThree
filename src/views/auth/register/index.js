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

const Register = () => {
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
        title={'Create Account'}
        textcolor={color.primary}
        fontsize={Size(2.2)}
        fontfamily={familyFont.reg}
        aligntext={'center'}
        marginleft={wp(2)}
        marginvertical={wp(3)}
      />

      <View style={styles.input}>
        <CustomText
          title={'Email'}
          textcolor={color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter your email'}
          fontfamily={familyFont.bold}
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
      <View style={styles.input}>
        <CustomText
          title={'Password'}
          textcolor={isError ? color.red : color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter your password'}
          borderradius={hp(1.5)}
          bgcolor={color.gray}
          isSecure={true}
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
            fontsize={Size(1.3)}
            fontfamily={familyFont.reg}
            marginleft={wp(2)}
            marginTop={wp(1)}
          />
        )}
      </View>
      <View style={styles.input}>
        <CustomText
          title={'Confirm Password'}
          textcolor={isError ? color.red : color.primary}
          fontsize={Size(1.4)}
          fontfamily={familyFont.reg}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter your password'}
          borderradius={hp(1.5)}
          bgcolor={color.gray}
          isSecure={true}
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
            fontsize={Size(1.3)}
            fontfamily={familyFont.reg}
            marginleft={wp(2)}
            marginTop={wp(1)}
          />
        )}
      </View>
      <CustomButton
        title="Create Account"
        fontsize={Size(2.1)}
        textcolor={color.white}
        fontfamily={familyFont.semiBold}
        backgroundcolor={color.primary}
        borderradius={hp(1)}
        padding={hp(2.2)}
        fontweight="bold"
        textalign="center"
        marginvertical={hp(3)}
        onpress={() => {
          nav.navigate('Profile');
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

export default Register;
