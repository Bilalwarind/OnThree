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
      <View style={{paddingHorizontal: wp(5)}}>
        <CustomText
          title={'Getting Back on My Feet'}
          textcolor={color.white}
          fontsize={Size(3)}
          fontfamily={familyFont.semiBold}
          aligntext={'left'}
          marginbottom={wp(1)}
          marginTop={hp(10)}
        />
        <View style={styles.header2}>
          <Image
            style={styles.profile}
            source={Images.profile}
            resizeMode="contain"
          />
          <CustomText
            title={'Sandrine Betrecinich'}
            fontsize={Size(1.7)}
            textcolor={color.white}
            fontfamily={familyFont.reg}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.bookmark}>
            <Image
              style={styles.upload}
              source={Images.upload}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <CustomButton
            title="5.2K"
            fontsize={Size(1.7)}
            backgroundcolor={color.primary}
            borderradius={hp(1)}
            textcolor={color.white}
            padding={hp(1.5)}
            paddinghori={hp(2)}
            flexdirection="row"
            justifycontent="center"
            alignitems="center"
            fontfamily={familyFont.bold}
            onpress={() => {
              onRegister();
            }}
            Icon=<AntDesign
              name="hearto"
              size={22}
              color={color.white}
              style={{paddingLeft: hp(2)}}
            />
          />
          <CustomButton
            title="992K"
            fontsize={Size(1.7)}
            backgroundcolor={color.primary}
            borderradius={hp(1)}
            textcolor={color.white}
            padding={hp(1.5)}
            paddinghori={hp(2)}
            flexdirection="row"
            justifycontent="center"
            alignitems="center"
            fontfamily={familyFont.bold}
            onpress={() => {
              onRegister();
            }}
            Icon=<Image
              style={styles.chat}
              source={Images.chat}
              resizeMode="contain"
            />
          />

          <TouchableOpacity>
            <Feather
              name="bookmark"
              size={30}
              color={color.white}
              style={styles.bookmark}
            />
          </TouchableOpacity>
        </View>
        <CustomText
          title={'ABOUT'}
          fontsize={Size(1.4)}
          textcolor={color.white}
          fontfamily={familyFont.reg}
          marginvertical={hp(2)}
        />
        <CustomText
          title={
            'This is the description of the video. It’s input by the creator of the story when they are creating and uploading.We can input whatever we like 💪 💪'
          }
          fontsize={Size(1.6)}
          textcolor={color.white}
          fontfamily={familyFont.reg}
        />
        <View style={{flexDirection: 'row', marginVertical: hp(3)}}>
          <CustomButton
            title="Perserverance"
            fontsize={Size(1.2)}
            backgroundcolor={color.btnColor}
            borderradius={hp(1)}
            textcolor={color.white}
            padding={hp(1)}
            paddinghori={hp(2)}
            marginright={wp(2)}
            fontfamily={familyFont.semiBold}
            onpress={() => {}}
          />
          <CustomButton
            title="Health & Wellness"
            fontsize={Size(1.2)}
            backgroundcolor={color.btnColor}
            borderradius={hp(1)}
            textcolor={color.white}
            padding={hp(1)}
            paddinghori={hp(2)}
            marginright={wp(2)}
            fontfamily={familyFont.semiBold}
            onpress={() => {}}
          />
        </View>
      </View>
      <View
        style={{
          borderTopWidth: hp(0.15),
          borderColor: color.btnColor,
          marginVertical: hp(2),
        }}
      />
      <CustomText
        title={'LINKS'}
        fontsize={Size(1.4)}
        textcolor={color.white}
        fontfamily={familyFont.reg}
        marginhorizontal={wp(5)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: wp(5),
        }}>
        <CustomButton
          title="Super Boost Yoga Pant"
          fontsize={Size(1.4)}
          // backgroundcolor={color.white}
          borderradius={hp(1)}
          textcolor={color.white}
          padding={hp(1)}
          marginvertical={hp(3)}
          flexdirection="row"
          fontfamily={familyFont.semiBold}
          onpress={() => {
            onRegister();
          }}
          Icon=<Entypo name="link" size={25} color={color.white} />
        />
        <Feather name="external-link" size={25} color={color.white} />
      </View>
      <View
        style={{
          borderTopWidth: hp(0.15),
          borderColor: color.btnColor,
        }}
      />
      <View style={{paddingHorizontal: wp(5)}}>
        <CustomText
          title={'PARTNERS'}
          fontsize={Size(1.4)}
          textcolor={color.white}
          fontfamily={familyFont.reg}
          marginTop={hp(2)}
        />
        <CustomButton
          title="Lululemon Athletica"
          fontsize={Size(1.7)}
          borderradius={hp(1)}
          textcolor={color.white}
          marginvertical={hp(2)}
          flexdirection="row"
          // alignitems="center"
          fontfamily={familyFont.reg}
          onpress={() => {
            onRegister();
          }}
          Icon=<Image
            style={styles.partners}
            source={Images.partners}
            resizeMode="contain"
          />
        />
        <CustomButton
          title="Play Full Story"
          fontsize={Size(2.1)}
          textcolor={color.primary}
          fontfamily={familyFont.semiBold}
          backgroundcolor={color.white}
          borderradius={hp(1)}
          padding={hp(2.2)}
          flexdirection="row"
          alignitems="center"
          textalign="center"
          marginvertical={hp(3)}
          onpress={() => {
            onRegister();
          }}
          Icon=<Feather name="play-circle" size={30} color={color.primary} />
        />

        <Dialog visible={isLoading}>
          <Dialog.Content>
            <Paragraph>isLoading</Paragraph>
          </Dialog.Content>
        </Dialog>
      </View>
    </View>
  );
};

export default StorySwipe;
