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
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../../utils/';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);

  const onRegister = async () => {
    if (password.length <= 0) {
      setIsError(true);
    }
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
        <View style={styles.header1}>
          <CustomText
            title={'Save'}
            textcolor={color.primary}
            fontsize={Size(1.7)}
            fontfamily={familyFont.bold}
            aligntext={'center'}
            marginvertical={hp(3)}
          />
        </View>
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
      <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

export default UpdateProfile;
