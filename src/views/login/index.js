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
// import messaging from '@react-native-firebase/messaging';
const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  const onRegister = async () => {
    // const token = await messaging().getToken();
    // if (token === '' || token === undefined || token === null) {
    //   Snackbar.show({
    //     text: "Veuillez relancer l'application !",
    //   });
    //   return;
    // }
    // let reg = /^[0-9]{9}$/;
    // if (phone == '') {
    //   Snackbar?.show({
    //     text: 'Saisissez votre numéro de mobile',
    //   });
    //   return;
    // }
    // if (!reg?.test(phone)) {
    //   Snackbar.show({
    //     text: 'Entrez un téléphone valide',
    //   });
    //   return;
    // }
    // if (pass.length < 6) {
    //   Snackbar.show({
    //     text: 'Mot de passe de plus de 6 caractères',
    //   });
    //   return;
    // }
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

      <View style={{height: hp(15), alignItems: 'center'}}>
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
      <View style={{height: hp(12), justifyContent: 'center'}}>
        <CustomText
          title={'Password'}
          textcolor={color.primary}
          fontSize={16}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
        <CustomTextInput
          placeholder={'Enter your password'}
          borderradius={hp(1.5)}
          bgcolor={color.gray}
          secureTextEntry={true}
          paddinghorizontal={hp(2)}
          // onchangetext={text => {
          //   setEmail(text);
          // }}
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
        />
      </View>
      <View style={{height: hp(5), justifyContent: 'center'}}>
        <CustomText
          title={'Forgot Password?'}
          textcolor={color.primary}
          fontSize={25}
          aligntext={'left'}
          marginleft={wp(2)}
          marginbottom={wp(1)}
        />
      </View>
      <CustomButton
        title="Log In"
        fontfamily="Poppins-Bold"
        fontsize={Size(1.9)}
        backgroundcolor={color.primary}
        borderradius={hp(1)}
        textcolor={color.white}
        padding={hp(1.7)}
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
        padding={hp(1.7)}
        textalign="center"
        marginvertical={hp(3)}
        onpress={() => {
          onRegister();
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  logo: {
    width: wp(45),
    tintColor: '#000',
  },
  ViewStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: wp(100),
  },
});
export default Login;
