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
import {addStory} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-player';
import styles from './style';

const PublishStory = ({route}) => {
  const {videoData} = route.params;
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {token, userId, isLoading} = useSelector(state => state.auth);
  const [title, setTiltle] = useState('');
  const [about, setAbout] = useState('');
  const [tag, setTag] = useState('');

  const onRegister = async () => {
    const data = {
      token: token,
      user_id: userId,
      title: title,
      about: about,
      other_story_id: 1,
      uservideo: videoData.uri,
      external_link: videoData.uri,
      'story_tag[0]': tag,
    };

    // const data = new FormData();
    // data.append('token', token);
    // data.append('user_id', userId);
    // data.append('title', title);
    // data.append('about', about);
    // data.append('other_story_id', 1);
    // data.append('uservideo', videoData.uri);
    // data.append('external_link', videoData.uri);
    // data.append('story_tag[0]', tag);
    dispatch(addStory(JSON.stringify(data)));
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
              uri: videoData.uri,
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
            onchangetext={val => setTiltle(val)}
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
            onchangetext={val => setAbout(val)}
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
            onchangetext={val => setTag(val)}
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
            value={videoData.uri}
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
            value="hi saeed"
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
          title="Publish Video"
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
          onpress={onRegister}
          Icon=<Feather name="video" size={19} color={color.white} />
        />
      </ScrollView>
      {/* <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog> */}
    </View>
  );
};

export default PublishStory;
