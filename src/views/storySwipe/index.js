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
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../utils/';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../redux';
import CustomTextInput from '../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';

const StorySwipe = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

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
          justifyContent: 'space-between',
          marginBottom: hp(2),
          paddingHorizontal: wp(7),
        }}>
        <View />
        <CustomText
          title={'922K Comments'}
          fontsize={Size(1.8)}
          textAlignVertical="center"
          textcolor={color.white}
          fontfamily={familyFont.bold}
          flexdirection="row"
          justifycontent="center"
          Icon={
            <Image
              style={styles.chat}
              source={Images.chat}
              resizeMode="contain"
            />
          }
        />
        <TouchableOpacity style={styles.bookmark}>
          <AntDesign name="close" size={25} color={color.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderTopWidth: hp(0.15),
          borderColor: color.btnColor,
          marginBottom: hp(1.8),
        }}
      />
      <View style={styles.header}>
        <View style={styles.header2}>
          <Image
            style={styles.profile}
            source={Images.profile}
            resizeMode="contain"
          />
          <CustomText
            title={
              'Sandrine Betrecinich thanks everyone for listening. Happy to answer any questions in the comments!! 🙏 👇'
            }
            fontsize={Size(1.7)}
            width={wp(78)}
            textcolor={color.white}
            fontfamily={familyFont.reg}
            title2={'Sandrine Betrecinich '}
            fontsize2={Size(1.8)}
            fontfamily2={familyFont.bold}
          />
        </View>
        <CustomText
          title={'5 days ago'}
          fontsize={Size(1.4)}
          textcolor={color.white}
          marginleft={wp(13)}
          fontfamily={familyFont.bold}
        />

        <CustomTextInput
          placeholder={'Add your comment here...'}
          borderradius={hp(1.5)}
          borderwidth={wp(0.6)}
          bordercolor={color.border}
          bgcolor={color.white}
          paddinghorizontal={hp(2)}
          flexdirection="row"
          alignitems={'center'}
          // multiline={true}
          // numberOfLines={6}
          justifycontent="space-between"
          marginTop={hp(5)}
          onchangetext={val => ''}
          paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
          isButton={true}
          fontfamily={familyFont.semiBold}
          fontsize={Size(1.8)}
          fontsize2={Size(1.4)}
          width2={wp(70)}
        />
      </View>
    </View>
  );
};

export default StorySwipe;
