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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(5),
        }}>
        <View style={{marginVertical: hp(5), alignItems: 'center'}}>
          <Image
            style={styles.logo}
            source={Images.undo}
            resizeMode="contain"
          />
        </View>
        <View style={{marginVertical: hp(5), alignItems: 'center'}}>
          <Image
            style={styles.logo}
            source={Images.undo}
            resizeMode="contain"
          />
        </View>
        <View style={{marginVertical: hp(5), alignItems: 'center'}}>
          <Image
            style={styles.logo}
            source={Images.undo}
            resizeMode="contain"
          />
        </View>
      </View>

      <CustomButton
        title="Megan McAllan"
        fontfamily="Poppins-Bold"
        fontsize={Size(2.5)}
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
        title="Mom, Fighter, True Believer, Sagitarius"
        fontfamily="Poppins-Bold"
        fontsize={Size(1.5)}
        backgroundcolor={color.white}
        borderradius={hp(1)}
        textcolor={color.primary}
        padding={hp(0)}
        textalign="center"
        marginvertical={hp(1)}
        onpress={() => {
          onRegister();
        }}
      />
      <CustomButton
        title="https://bit.ly/yasqueen"
        fontfamily="Poppins-Bold"
        fontsize={Size(1)}
        backgroundcolor={color.white}
        borderradius={hp(1)}
        textcolor={color.primary}
        padding={hp(0)}
        textalign="center"
        fontweight="bold"
        marginvertical={hp(1)}
        onpress={() => {
          onRegister();
        }}
      />
      <CustomButton
        title="Stories"
        fontfamily="Poppins-Bold"
        fontsize={Size(2.5)}
        backgroundcolor={color.white}
        borderradius={hp(1)}
        textcolor={color.primary}
        padding={hp(1)}
        textalign="center"
        fontweight="600"
        marginvertical={hp(1)}
        onpress={() => {
          onRegister();
        }}
      />
      <CustomButton
        title="You haven’t added any stories yet. What do you want to share?"
        fontfamily="Poppins-Bold"
        fontsize={Size(1.5)}
        backgroundcolor={color.white}
        borderradius={hp(1)}
        textcolor={color.primary}
        padding={hp(1)}
        textalign="center"
        marginvertical={hp(1)}
        onpress={() => {
          onRegister();
        }}
      />

      <CustomButton
        title="Add a Story"
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

      <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

export default Login;
