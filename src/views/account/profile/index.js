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
  FlatList,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../../utils/';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';

import {
  userProfileInfo,
  userAllStories,
  userBookMarkedStories,
} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';
import moment from 'moment/moment';
import VideoPlayer from 'react-native-video-player';
import axios from 'axios';
import CommentPlaceHolder from 'react-native-vector-icons/MaterialCommunityIcons';
import {PROFILE_SUCCESS} from '../../../redux/actions/types';
const Profile = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [allStories, setAllStories] = useState([]);
  const [userData, setUserData] = useState('');
  const {userProfile, userStoriesData, bookMarkedStoriesData, isLoading} =
    useSelector(state => state.home);
  const {token, userId} = useSelector(state => state.auth);
  const [activeBtn, setActiveBtn] = useState(1);
  const [bookMarks, setBookMarks] = useState([]);

  const data = {
    token: token,
    user_id: userId,
    story_user_id: userId,
  };
  const dataBookMarked = {
    token: token,
    user_id: userId,
  };
  useEffect(() => {
    fetachAllBookmarks();
  }, [activeBtn]);
  useEffect(() => {
    // dispatch(userProfileInfo(data));
    // dispatch(userAllStories(data));
    fetchAllStories();
    fetchUserInfo();
    // const unsubscribe = nav.addListener(
    //   'focus',
    //   () => {
    //     dispatch(userProfileInfo(data));
    //     dispatch(userAllStories(data));
    //     dispatch(userBookMarkedStories(dataBookMarked));
    //   },
    // [],
    // );

    // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;
  }, []);
  const fetachAllBookmarks = async () => {
    setloading(true);
    const params = new FormData();
    params.append('token', token);
    params.append('user_id', userId);
    console.log('params', params);
    await axios
      .post(
        `https://theonlinetest.info/onethree/api/get-user-bookmark-stories`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        // alert(JSON.stringify(res.data.data.user[1].liked_story));
        if (res?.data?.success !== 0) {
          setloading(false);
          console.log('first', res?.data?.data?.stories);
          setBookMarks(res?.data?.data?.stories);
        } else {
          setloading(false);
          setBookMarks([]);
          console.log('sed', res?.data);
        }
      })
      .catch(err => {
        setloading(false);
        console.log('3rd', err);
        setBookMarks([]);
        return err;
      });
  };
  const fetchUserInfo = async () => {
    setloading(true);
    const params = new FormData();
    params.append('token', token);
    params.append('user_id', userId);
    console.log('params', params);
    await axios
      .post(`https://theonlinetest.info/onethree/api/getuserinfo`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        // alert(JSON.stringify(res.data.data.user[1].liked_story));
        if (res?.data?.success !== 0) {
          setloading(false);
          setUserData(res?.data?.data?.user);
          dispatch({
            type: PROFILE_SUCCESS,
            payload: res?.data?.data?.user,
          });
        } else {
          setloading(false);
          setUserData([]);
          console.log('sed', res?.data);
        }
      })
      .catch(err => {
        setloading(false);
        console.log('3rd', err);
        setUserData([]);
        return err;
      });
  };
  const fetchAllStories = async () => {
    setloading(true);
    const params = new FormData();
    params.append('token', token);
    params.append('user_id', userId);
    params.append('story_user_id', userId);
    console.log('params', params);
    await axios
      .post(
        `https://theonlinetest.info/onethree/api/get-user-all-stories`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        // alert(JSON.stringify(res.data.data.user[1].liked_story));
        if (res?.data?.success !== 0) {
          setloading(false);
          console.log('stories', res?.data?.data?.stories);
          setAllStories(res?.data?.data?.stories);
        } else {
          setloading(false);
          setAllStories([]);
          console.log('sed', res?.data);
        }
      })
      .catch(err => {
        setloading(false);
        console.log('3rd', err);
        setAllStories([]);
        return err;
      });
  };
  const [loading, setloading] = useState(false);

  const renderTag = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: hp(1),
        }}>
        <CustomText
          title={item?.tag}
          fontsize={Size(1.2)}
          backgroundcolor={color.gray}
          borderradius={hp(1)}
          viewheight={hp(5)}
          justifycontent={'center'}
          textcolor={color.primary}
          padding={hp(1)}
          paddinghori={hp(2)}
          marginright={wp(2)}
          fontfamily={familyFont.semiBold}
        />
      </View>
    );
  };
  const renderStories = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            nav.navigate('PlayFullStory', {url: item?.url});
          }}
          style={{flexDirection: 'row', marginVertical: hp(0.8)}}>
          <View style={styles.story}>
            <VideoPlayer
              style={styles.storyImg}
              source={Images.story}
              defaultMuted={true}
              loop={true}
              video={{
                uri: item?.url,
              }}
              // autoplay={true}
              thumbnail={{
                uri: item?.url,
              }}
              customStyles={{seekBarBackground: 'white'}}
            />
          </View>
          <View style={styles.storyDetail}>
            <CustomText
              title={moment(item?.created_at)?.format('ll')}
              textcolor={color.primary}
              fontsize={Size(1.1)}
              marginvertical={hp(0.5)}
              fontfamily={familyFont.bold}
            />
            <CustomText
              title={item?.title}
              textcolor={color.primary}
              fontsize={Size(1.8)}
              marginvertical={hp(0.5)}
              fontfamily={familyFont.bold}
            />
            <CustomText
              title={item?.about}
              textcolor={color.primary}
              fontsize={Size(1.3)}
              marginvertical={hp(0.5)}
              fontfamily={familyFont.meduim}
            />
            <FlatList
              data={item?.get_story_tags}
              horizontal
              renderItem={renderTag}
              keyExtractor={item => item?.id}
            />
          </View>
        </TouchableOpacity>
      </View>
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
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.header}>
          <Image
            style={styles.logo}
            source={Images.undo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.header2}>
          <Image
            style={styles.profile}
            source={{
              uri:
                userData?.profile_image ||
                'https://icon-library.com/images/user-profile-icon/user-profile-icon-24.jpg',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => nav.navigate('UpdateProfile')}
          style={styles.header}>
          <CustomText
            title={'Edit'}
            textcolor={color.primary}
            fontsize={Size(1.7)}
            fontfamily={familyFont.reg}
            aligntext={'center'}
            marginvertical={hp(3)}
          />
        </TouchableOpacity>
      </View>
      <CustomText
        title={`${userData?.first_name} ${userData?.last_name}`}
        textcolor={color.primary}
        fontsize={Size(2.2)}
        aligntext={'center'}
        fontfamily={familyFont.semiBold}
      />
      <CustomText
        title={userData?.about !== 'null' ? userData?.about : ''}
        textcolor={color.primary}
        fontsize={Size(1.4)}
        fontfamily={familyFont.reg}
        aligntext={'center'}
        marginvertical={hp(0.5)}
      />
      {userProfile?.slug && (
        <CustomButton
          title={userData?.email ? userData?.email : ''}
          fontsize={Size(1.4)}
          backgroundcolor={color.white}
          borderradius={hp(1)}
          textcolor={color.primary}
          marginbottom={hp(4)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          fontfamily={familyFont.semiBold}
          onpress={() => {
            '';
          }}
          Icon={
            <Image
              style={styles.logo}
              source={Images.chain}
              resizeMode="contain"
            />
          }
        />
      )}
      <View style={styles.topTab}>
        <CustomButton
          title="Stories"
          fontsize={Size(1.4)}
          backgroundcolor={activeBtn == 1 ? color.white : color.gray}
          borderradius={hp(1)}
          textcolor={color.primary}
          padding={hp(1)}
          textalign="center"
          paddinghori={hp(2)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          width={wp(40)}
          fontfamily={familyFont.meduim}
          onpress={() => {
            setActiveBtn(1);
          }}
        />
        <CustomButton
          title="Bookmarks"
          fontsize={Size(1.4)}
          backgroundcolor={activeBtn == 2 ? color.white : color.gray}
          borderradius={hp(1)}
          textcolor={color.primary}
          padding={hp(1)}
          textalign="center"
          paddinghori={hp(2)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          width={wp(40)}
          fontfamily={familyFont.meduim}
          onpress={() => {
            setActiveBtn(2);
          }}
        />
        {/* <CustomButton
          title="Comments"
          fontsize={Size(1.4)}
          backgroundcolor={activeBtn == 3 ? color.white : color.gray}
          borderradius={hp(1)}
          textcolor={color.primary}
          padding={hp(1)}
          textalign="center"
          paddinghori={hp(2)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          width={wp(29)}
          fontfamily={familyFont.meduim}
          onpress={() => {
            setActiveBtn(3);
          }}
        /> */}
      </View>
      {activeBtn == 1 && (
        <CustomText
          title="Stories"
          fontfamily={familyFont.reg}
          fontsize={Size(2.2)}
          textcolor={color.primary}
          alignitems="center"
        />
      )}
      {activeBtn == 2 && (
        <CustomText
          title="Bookmarks"
          fontfamily={familyFont.reg}
          fontsize={Size(2.2)}
          textcolor={color.primary}
          alignitems="center"
        />
      )}
      {activeBtn == 3 && (
        <CustomText
          title="Comments"
          fontfamily={familyFont.reg}
          fontsize={Size(2.2)}
          textcolor={color.primary}
          alignitems="center"
        />
      )}
      {activeBtn === 1 && userStoriesData?.length > 1 ? (
        <CustomButton
          title="You haven’t added any stories yet. What do you want to share?"
          fontfamily={familyFont.reg}
          fontsize={Size(1.4)}
          backgroundcolor={color.white}
          borderradius={hp(1)}
          textcolor={color.primary}
          padding={hp(1)}
          textalign="center"
          marginvertical={hp(1)}
          onpress={() => {
            '';
          }}
        />
      ) : (
        bookMarks?.length < 1 && (
          <CustomButton
            title="You haven’t added any bookmarks yet."
            fontfamily={familyFont.reg}
            fontsize={Size(1.4)}
            backgroundcolor={color.white}
            borderradius={hp(1)}
            textcolor={color.primary}
            padding={hp(1)}
            textalign="center"
            marginvertical={hp(1)}
            onpress={() => {
              '';
            }}
          />
        )
      )}
      {activeBtn == 1 ? (
        <CustomButton
          title="Add a Story"
          fontfamily={familyFont.semiBold}
          fontsize={Size(2.1)}
          backgroundcolor={color.primary}
          borderradius={hp(1)}
          textcolor={color.white}
          padding={hp(2)}
          textalign="center"
          marginvertical={hp(3)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          onpress={() => {
            nav.replace('CreateStory');
          }}
          Icon={<Feather name="video" size={19} color={color.white} />}
        />
      ) : (
        <CustomButton
          title="Discover Stories"
          fontfamily={familyFont.semiBold}
          fontsize={Size(2.1)}
          backgroundcolor={color.primary}
          borderradius={hp(1)}
          textcolor={color.white}
          padding={hp(2)}
          textalign="center"
          marginvertical={hp(3)}
          flexdirection="row"
          justifycontent="center"
          alignitems="center"
          onpress={() => {
            '';
          }}
          Icon={<Feather name="search" size={17} color={color.white} />}
        />
      )}
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* {renderStories()} */}
      <FlatList
        data={activeBtn === 1 ? allStories : bookMarks}
        style={{flex: 1}}
        renderItem={renderStories}
        keyExtractor={item => item?.id}
      />
      {/* {userProfile && userStoriesData
            ? userStoriesData?.map(item => (
                
              ))
            : null} */}
      {/* </ScrollView> */}
    </View>
  );
};

export default Profile;
