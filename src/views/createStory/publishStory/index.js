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
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-player';
import styles from './style';

const PublishStory = () => {
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

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.row1}>
        <View style={styles.header2}>
          <CustomText
            title="Add Story"
            textcolor={color.primary}
            fontsize={Size(2.2)}
            aligntext={'center'}
            marginvertical={hp(0.5)}
            fontfamily={familyFont.semiBold}
          />
        </View>
        <View style={styles.header}>
          <AntDesign name="close" size={22} color={color.primary} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.story}>
          <VideoPlayer
            video={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
            }}
            videoWidth={wp(100)}
            videoHeight={hp(100)}
            // autoplay={true}
            thumbnail={{
              uri: 'https://images.pexels.com/photos/1995730/pexels-photo-1995730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            style={{
              width: wp(50),
              height: wp(100),
              borderRadius: wp(3),
            }}
          />
        </View>
        <View style={{height: hp(15), justifyContent: 'center'}}>
          <CustomText
            title={'Title'}
            textcolor={color.primary}
            fontsize={Size(1.4)}
            fontfamily={familyFont.reg}
            aligntext={'left'}
            marginleft={wp(2)}
            marginbottom={wp(1)}
          />
          <CustomTextInput
            placeholder={'Add Title'}
            placeholderStyle={{fontWeight: 'bold'}}
            borderradius={hp(1.5)}
            borderwidth={wp(0.6)}
            bordercolor={color.border}
            bgcolor={color.white}
            paddinghorizontal={hp(2)}
            onchangetext={text => {}}
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
            placeholder={'Add a description about this video'}
            placeholderStyle={{fontWeight: 'bold'}}
            borderradius={hp(1.5)}
            borderwidth={wp(0.6)}
            bordercolor={color.border}
            bgcolor={color.white}
            paddinghorizontal={hp(2)}
            numberOfLines={3}
            multiline={true}
            onchangetext={text => {}}
            paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
          />
        </View>
        <View style={{height: hp(12), justifyContent: 'center'}}>
          <CustomText
            title={'Tags'}
            textcolor={color.primary}
            fontsize={Size(1.4)}
            fontfamily={familyFont.reg}
            aligntext={'left'}
            marginleft={wp(2)}
            marginbottom={wp(1)}
          />
          <CustomTextInput
            placeholder={'Add Tags with #'}
            placeholderStyle={{fontWeight: 'bold'}}
            borderradius={hp(1.5)}
            borderwidth={wp(0.6)}
            bordercolor={color.border}
            bgcolor={color.white}
            paddinghorizontal={hp(2)}
            onchangetext={text => {}}
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
            placeholder={'Add a URL here'}
            placeholderStyle={{fontWeight: 'bold'}}
            borderradius={hp(1.5)}
            borderwidth={wp(0.6)}
            bordercolor={color.border}
            bgcolor={color.white}
            paddinghorizontal={hp(2)}
            onchangetext={text => {}}
            paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
          />
        </View>
        <View style={{height: hp(12), justifyContent: 'center'}}>
          <CustomText
            title={'Partners'}
            textcolor={color.primary}
            fontsize={Size(1.4)}
            fontfamily={familyFont.reg}
            aligntext={'left'}
            marginleft={wp(2)}
            marginbottom={wp(1)}
          />
          <CustomTextInput
            placeholder={'Add Partners with @'}
            placeholderStyle={{fontWeight: 'bold'}}
            borderradius={hp(1.5)}
            borderwidth={wp(0.6)}
            bordercolor={color.border}
            bgcolor={color.white}
            paddinghorizontal={hp(2)}
            onchangetext={text => {}}
            paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
          />
        </View>
        <CustomButton
          title="Publish"
          fontfamily={familyFont.semiBold}
          fontsize={Size(2.1)}
          backgroundcolor={color.primary}
          borderradius={hp(1)}
          textcolor={color.white}
          padding={hp(1.5)}
          textalign="center"
          marginvertical={hp(3)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          onpress={() => {
            nav.navigate('StorySwipe');
          }}
          Icon=<Feather name="video" size={19} color={color.white} />
        />
      </ScrollView>
      <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

export default PublishStory;
