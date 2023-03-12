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
  Alert,
  FlatList,
  ListItem,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../../utils/';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {addStory, getAllUserList} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal, ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-player';
import styles from './style';
import {BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {createThumbnail} from 'react-native-create-thumbnail';

const PublishStory = ({route}) => {
  const {videoData} = route.params;
  const dispatch = useDispatch();
  const [loader, setloading] = useState(false);
  const nav = useNavigation();
  const {allUserList, isLoading} = useSelector(state => state.home);
  const {token, userId} = useSelector(state => state.auth);
  const [title, setTiltle] = useState('');
  const [about, setAbout] = useState('');
  const [tag, setTag] = useState('');
  const [Partners, setPartners] = useState('');
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  function handleBackButtonClick() {
    Alert.alert('Exit', 'Do you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel', 'Cancel'),
      },
      {text: 'OK', onPress: () => nav.goBack()},
    ]);
    return true;
  }
  useEffect(() => {
    const data2 = new FormData();
    data2.append('token', token);
    data2.append('user_id', userId);
    // dispatch(getAllUserList(data2));

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [show, filteredDataSource]);
  const onUpload = async thumbnail => {
    setloading(true);

    const data = new FormData();
    data.append('token', token);
    data.append('user_id', userId);
    data.append('title', title);
    data.append('about', about);
    data.append('other_story_id', '1');

    // data.append('uservideo', videoData.uri);
    data.append('uservideo', {
      uri:
        Platform.OS === 'ios'
          ? videoData.uri?.replace('file://', '/')
          : videoData.uri,
      type: 'video/mp4',
      name: Math.floor(Math.random() * 100) + 1 + 'thumnail.jpeg',
    });
    data.append('thumbnail', {
      uri: thumbnail,
      type: 'image/jpeg',
      name: Math.floor(Math.random() * 100) + 1 + 'thumbnail.jpeg',
    });
    data.append('external_link', url);
    data.append('story_tag[0]', tag);
    console.log('data', data);
    const res = await dispatch(addStory(data, token, nav));
    if (res) {
      setloading(false);
    } else {
      setloading(false);
    }
  };
  const generateThumnail = url => {
    createThumbnail({
      url: url,
      timeStamp: 2000,
    })
      .then(response => {
        onUpload(response.path);
      })
      .catch(err => {
        onUpload('');
      });
  };
  const searchFilterFunction = text => {
    if (text !== null || '') {
      setShow(true);
      setPartners(text);
      const newData = allUserList.filter(function (item) {
        const itemData = item?.first_name
          ? item?.first_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    }
  };
  const ItemView = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShow(false);
          setPartners(`${item?.first_name} ${item?.last_name}`);
        }}
        style={{
          backgroundColor: color.white,
          padding: hp(2),
          borderWidth: wp(0.45),
          borderColor: color.border,
          borderBottomLeftRadius:
            index == filteredDataSource.length - 1 ? hp(1.5) : 0,
          borderBottomRightRadius:
            index == filteredDataSource.length - 1 ? hp(1.5) : 0,
        }}>
        <Text
          style={{
            color: color.primary,
          }}>
          {`${item?.first_name} ${item?.last_name}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <AntDesign
            name="close"
            size={22}
            color={color.primary}
            onPress={() => {
              Alert.alert('Exit', 'Do you want to go back?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel', 'Cancel'),
                },
                {text: 'OK', onPress: () => nav.goBack()},
              ]);
            }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={styles.story}>
          <VideoPlayer
            video={{
              uri: videoData.uri,
            }}
            videoWidth={wp(100)}
            videoHeight={hp(100)}
            autoplay={true}
            thumbnail={{
              uri: videoData.uri,
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
            value={url}
            placeholderStyle={{fontWeight: 'bold'}}
            borderradius={hp(1.5)}
            borderwidth={wp(0.6)}
            bordercolor={color.border}
            bgcolor={color.white}
            paddinghorizontal={hp(2)}
            onchangetext={text => {
              setUrl(text);
            }}
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
            onchangetext={text => searchFilterFunction(text)}
            paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(3)}
            value={Partners}
          />
        </View>
      </ScrollView>
      {show && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredDataSource ? filteredDataSource : allUserList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          style={{height: hp(15)}}
        />
      )}
      <CustomButton
        title="Publish Video"
        fontfamily={familyFont.semiBold}
        fontsize={Size(2.1)}
        backgroundcolor={color.primary}
        borderradius={hp(1)}
        textcolor={color.white}
        padding={hp(1.5)}
        textalign="center"
        marginvertical={hp(1)}
        flexdirection="row"
        alignitems="center"
        onpress={() => {
          generateThumnail(videoData.uri);
        }}
        Icon={<Feather name="video" size={19} color={color.white} />}
      />
      {loader && (
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
    </SafeAreaView>
  );
};

export default PublishStory;
