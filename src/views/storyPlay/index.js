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
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../utils/';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/Button';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllStories,
  likeStory,
  commentsStory,
  logoutUser,
  getAllComments,
} from '../../redux';
import styles from './style';
import VideoPlayer from 'react-native-video-player';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomTextInput from '../../components/CutomTextInput';
import moment from 'moment/moment';
import axios from 'axios';
import baseUrl from '../../redux/baseUrl';
import Share from 'react-native-share';
import {param} from 'express/lib/request';
import BookMarkedIcon from 'react-native-vector-icons/Ionicons';
import ChatIcon from 'react-native-vector-icons/Entypo';
import CommentPlaceHolder from 'react-native-vector-icons/MaterialCommunityIcons';
const StoryPlay = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const refRBSheet = useRef();
  const refRBSheetComment = useRef();
  const [isComment, setIsComment] = useState(false);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const {allStoriesData, userProfile} = useSelector(state => state.home);
  const {token, userId, userData} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [likeStoryStatus, setLikeStoryStatus] = useState({});
  const [comment, setComment] = useState('');
  const [joinChat, setJoinChat] = useState(false);
  const [loading, setloading] = useState(false);
  const [comments, setComments] = useState('');
  const [isLiked, setIsLiked] = useState(-1);
  const [likesData, setLikesData] = useState();
  const [totlaLikes, setTotalLikes] = useState(0);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [commentlength, setCommentLength] = useState();
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState({
    show: 0,
    top: 70,
  });

  const data = {
    token: token,
    user_id: userId,
    page: page,
  };
  const [opacity, setOpacity] = useState(0);

  const onLoadStart = () => {
    setOpacity(1);
  };
  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = ({isBuffering}) => {
    setOpacity(isBuffering ? 1 : 0);
  };

  useEffect(() => {
    setIsLiked(likeStoryStatus?.liked_story);
    fetcAllComments(likeStoryStatus.id);
    setTotalLikes(likeStoryStatus?.get_story_likes?.length);
    setCommentLength(likeStoryStatus?.get_story_comment?.length);
    setIsBookMarked(likeStoryStatus?.bookmark_story);
    console.log('likeStoryStatus.links', likeStoryStatus);
  }, [likeStoryStatus]);
  const loadMore = () => {
    setIsLoading(true);
    if (allStoriesData?.data?.length > 0) {
      setPage(page + 1);
      dispatch(getAllStories(data, setIsLoading));
    }
  };

  const fetcAllComments = async storyId => {
    setloading(true);
    const params = new FormData();
    params.append('token', token);
    params.append('user_id', userId);
    params.append('story_id', storyId);
    let data = {token: token, user_id: userId, story_id: storyId};
    await axios
      .post(
        `https://theonlinetest.info/onethree/api/get-all-comment-of-story`,
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
          console.log('comment', res?.data?.data);
          return setComments(res?.data?.data);
        } else {
          console.log('comment', res?.data?.data);

          setloading(false);
          setComments([]);
        }
      })
      .catch(err => {
        setloading(false);

        setComments([]);
        return err;
      });
  };
  const postComment = async (token, userId, storyId, commentsTxt) => {
    setloading(true);
    const params = new FormData();
    params.append('token', token);
    params.append('user_id', userId);
    params.append('story_id', storyId);
    params.append('comment', commentsTxt);
    await axios
      .post(`https://theonlinetest.info/onethree/api/add-comment`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        // alert(JSON.stringify(res.data.data.user[1].liked_story));
        if (res?.data?.success !== 0) {
          setComment('');
          setloading(false);
          setComments(res?.data?.data);
          // setCommentLength(total_comments);
        } else {
          setloading(false);
          setComments([]);
        }
      })
      .catch(err => {
        setloading(false);

        setComments([]);
        return err;
      });
  };
  const likeStoris = async isLiked => {
    const params = new FormData();
    params.append('token', token);
    params.append('user_id', userId);
    params.append('story_id', likeStoryStatus?.id);
    params.append('liked', isLiked === 1 ? 0 : 1);
    await axios
      .post(`https://theonlinetest.info/onethree/api/add-likes`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res?.data?.success !== 0) {
          setloading(false);
          setLikesData(res?.data?.data?.story);
          setTotalLikes(res?.data?.data?.story.likes);
          return setIsLiked(res?.data?.data?.story.liked);
        } else {
          setLikesData(0);
          setloading(false);
        }
      })
      .catch(err => {
        setloading(false);
        return err;
      });
  };
  const storyBookMakr = async () => {
    setloading(true);
    const params = new FormData();
    params.append('token', token);
    params.append('user_id', userId);
    params.append('story_id', likeStoryStatus?.id);
    params.append('status', isBookMarked ? 0 : 1);

    await axios
      .post(
        `https://theonlinetest.info/onethree/api/add-story-bookmark`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setloading(false);
        if (res?.data?.success !== 0) {
          setloading(false);
          alert(res?.data?.message);
          if (res?.data?.message === 'Bookmark removed successfully!') {
            setIsBookMarked(false);
          } else {
            setIsBookMarked(true);
          }
        } else {
          setIsBookMarked(false);
          setloading(false);
        }
      })
      .catch(err => {
        setloading(false);
        return err;
      });
  };
  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllStories(data, setIsLoading));
    setPage(allStoriesData?.current_page);
  }, [isFocused]);
  const renderComments = ({item, index}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginVertical: hp(1.6)}}>
        {item?.user_details?.profile_image ? (
          <Image
            style={styles.profile}
            source={{
              uri: item?.user_details?.profile_image,
            }}
          />
        ) : (
          <CommentPlaceHolder
            name="account-circle-outline"
            color={'white'}
            size={30}
            style={{marginRight: wp(2)}}
          />
        )}
        <View
          style={{
            alignContent: 'flex-start',
          }}>
          <CustomText
            title={item?.comment}
            fontsize={Size(1.7)}
            width={wp(74)}
            textcolor={color.white}
            fontfamily={familyFont.reg}
            title2={`${item?.user_details?.first_name} ${item?.user_details.last_name} `}
            fontsize2={Size(1.8)}
            fontfamily2={familyFont.bold}
          />
          <CustomText
            title={moment(item?.created_at).fromNow()}
            fontsize={Size(1.4)}
            textcolor={color.white}
            fontfamily={familyFont.bold}
            marginTop={12}
          />
        </View>
      </View>
    );
  };
  const renderPartners = ({item, index}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginVertical: 32}}>
        <CustomButton
          title={item?.get_user?.username}
          fontsize={Size(1.7)}
          borderradius={hp(1)}
          textcolor={color.white}
          marginvertical={hp(2)}
          flexdirection="row"
          marginhori={wp(2)}
          // alignitems="center"
          fontfamily={familyFont.reg}
          onpress={() => {
            // onRegister();
          }}
          Icon={
            <Image
              style={styles.partners}
              source={Images.partners}
              resizeMode="contain"
            />
          }
        />
      </View>
    );
  };
  const renderLinks = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomButton
          title={item?.url}
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
          Icon={<Entypo name="link" size={25} color={color.white} />}
          // {<Feather name="external-link" size={25} color={color.white} />}
        />

        <View
          style={{
            borderTopWidth: hp(0.15),
            borderColor: color.btnColor,
          }}
        />
      </View>
    );
  };
  const renderItems = ({item, index}) => {
    // createThumbnails(item?.url);
    return (
      <View>
        <VideoPlayer
          key={index}
          // onVideoProgress={() => {
          //   console.log('loadin', 'loadin');
          // }}
          // onVideoBuffer={() => {
          //   console.log('isBuuber', 'onBuffer');
          // }}
          // isBuffering={() => {
          //   console.log('isBuuber', 'isBuffer');
          // }}
          // onBuffer={() => {
          //   console.log('buffer', 'buffer');
          // }}
          seekBar="white"
          customStyles={{
            seekBarBackground: color.white,
            seekBarKnobSeeking: color.white,
            seekBarProgress: color.white,
            seekBar: color.white,
          }}
          video={{
            uri: item?.url,
          }}
          videoWidth={wp(100)}
          videoHeight={hp(100)}
          // onBuffer={onBuffer}
          // onLoadStart={() => {
          //   console.log('onLoad', 'onLoad');
          // }}
          // onLoad={console.log('onLoad', 'onstart')}
          // onVideoLoadStart={() => {
          //   console.log('ONVidoeload', 'ONVidoeload');
          // }}
          // autoplay={true}
          thumbnail={{
            uri: item?.thumbnail,
          }}
          resizeMode={'cover'}
          // autoplay={true}
        />
        {/* <ActivityIndicator
          animating
          size="large"
          color={color.white}
          style={{
            opacity: opacity,
            position: 'absolute',
            top: hp(50),
            left: 70,
            right: 70,
            // height: 50,
          }}
        /> */}
        <View
          style={{
            position: 'absolute',
            top: hp(2),
            left: wp(2),
            right: wp(2),
          }}>
          {position.show == 0 && (
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    '',
                    'Do you want to logout?',
                    [
                      {
                        text: 'NO',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'YES',
                        onPress: () => {
                          dispatch(logoutUser(nav));
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
                <Image
                  style={styles.profile3}
                  source={Images.logo2}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  nav.navigate('Profile');
                }}>
                <Image
                  style={styles.profile2}
                  source={{
                    uri:
                      userData?.profile_image ||
                      'https://icon-library.com/images/user-profile-icon/user-profile-icon-24.jpg',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          <View>
            {position.show == 0 ? (
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  marginBottom: hp(4),
                  marginTop: hp(position.top),
                }}
                onPress={() => {
                  setPosition({
                    show: 1,
                    top: 4,
                  });
                  setLikeStoryStatus(item);
                  refRBSheet.current.open();
                  console.log('item.liked_story', item.liked_story);
                  // handleOpenPress();
                }}>
                <AntDesign name="up" size={25} color={color.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  marginBottom: hp(2.5),
                  marginTop: hp(position.top),
                }}
                onPress={() => {
                  setPosition({
                    show: 0,
                    top: 70,
                  });
                  refRBSheet.current.close();

                  // handleClosePress();
                }}>
                <AntDesign name="down" size={25} color={color.white} />
              </TouchableOpacity>
            )}
            <CustomText
              title={item?.title}
              textcolor={color.white}
              fontsize={Size(3)}
              fontfamily={familyFont.semiBold}
              aligntext={'left'}
            />
            <View style={styles.header2}>
              <Image
                style={styles.profile2}
                source={{
                  uri:
                    item?.user_details?.profile_image ||
                    'https://icon-library.com/images/user-profile-icon/user-profile-icon-24.jpg',
                }}
              />
              <CustomText
                title={`${item?.user_details?.first_name} ${item?.user_details?.last_name}`}
                fontsize={Size(1.7)}
                textcolor={color.white}
                fontfamily={familyFont.reg}
                marginleft={wp(2)}
              />
            </View>
          </View>
        </View>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allStoriesData?.data}
        keyExtractor={item => item?.id}
        renderItem={renderItems}
        // refreshing={true}
        // onRefresh={() => {
        //   dispatch(getAllStories(data));
        // }}
        onEndReached={() => {
          loadMore();
        }}
        onEndReachedThreshold={0.5}
      />
      <RBSheet
        height={hp(76)}
        key={likeStoryStatus.story_id}
        ref={refRBSheet}
        onClose={() => setPosition({show: 0, top: 70})}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderTopRightRadius: wp(5),
            borderTopLeftRadius: wp(5),
          },
        }}>
        {!isComment ? (
          <View
            style={{
              backgroundColor: '#0F0F0F',
              padding: wp(4),
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Share.open({
                    title: likeStoryStatus?.title,
                    failOnCancel: false,
                    urls: [likeStoryStatus?.url],
                  })
                    .then(res => {
                      console.log(res);
                    })
                    .catch(err => {
                      err && console.log(err);
                    });
                }}
                style={styles.bookmark}>
                <Image
                  style={styles.upload}
                  source={Images.upload}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <CustomButton
                title={totlaLikes}
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
                  likeStoris(isLiked);
                }}
                Icon={
                  isLiked === 0 ? (
                    <AntDesign
                      name="hearto"
                      size={22}
                      color={color.white}
                      style={{paddingLeft: hp(2)}}
                    />
                  ) : (
                    <AntDesign
                      name="heart"
                      size={22}
                      color={color.white}
                      style={{paddingLeft: hp(2)}}
                    />
                  )
                }
              />
              <CustomButton
                title={commentlength ? commentlength : 0}
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
                  setIsComment(true);
                  // refRBSheetComment?.current?.open();
                }}
                Icon={
                  <Image
                    style={styles.chat}
                    source={Images.chat}
                    resizeMode="contain"
                  />
                }
              />

              <TouchableOpacity
                onPress={() => {
                  !isLoading && storyBookMakr();
                }}>
                {!isBookMarked ? (
                  <Feather
                    name="bookmark"
                    size={30}
                    color={color.white}
                    style={styles.bookmark}
                  />
                ) : (
                  <BookMarkedIcon
                    name="bookmark"
                    size={30}
                    color={color.white}
                    style={styles.bookmark}
                  />
                )}
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
              title={likeStoryStatus?.about}
              fontsize={Size(1.6)}
              textcolor={color.white}
              fontfamily={familyFont.reg}
            />
            <View style={{flexDirection: 'row', marginVertical: hp(3)}}>
              {likeStoryStatus?.get_story_tags?.map(item => (
                <CustomButton
                  title={item?.tag}
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
              ))}
            </View>
            <View
              style={{
                borderTopWidth: hp(0.15),
                borderColor: color.btnColor,
                marginVertical: hp(2),
              }}
            />
            <View>
              <CustomText
                title={'LINKS'}
                fontsize={Size(1.4)}
                textcolor={color.white}
                fontfamily={familyFont.reg}
              />
              <FlatList
                data={likeStoryStatus?.links}
                style={{flex: 1}}
                renderItem={renderLinks}
                keyExtractor={item => item?.id}
              />
              {/* {likeStoryStatus?.links?.map(item => {
                console.log('item', item);
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CustomButton
                    title={item?.url}
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
                    Icon={<Entypo name="link" size={25} color={color.white} />}
                    // {<Feather name="external-link" size={25} color={color.white} />}
                  />

                  <View
                    style={{
                      borderTopWidth: hp(0.15),
                      borderColor: color.btnColor,
                    }}
                  />
                </View>;
              })} */}
            </View>

            {likeStoryStatus?.get_story_partners?.length > 0 && (
              <CustomText
                title={'PARTNERS'}
                fontsize={Size(1.4)}
                textcolor={color.white}
                fontfamily={familyFont.reg}
                marginTop={hp(2)}
              />
            )}
            <FlatList
              data={comments?.story?.get_story_comment}
              style={{flex: 1}}
              horizontal
              renderItem={renderPartners}
              keyExtractor={item => item?.id}
            />
            {/* {likeStoryStatus?.get_story_partners?.map(item => {
              console.log('item?.user?.username', item?.user?.username);
              <CustomButton
                title={item?.user?.username}
                fontsize={Size(1.7)}
                borderradius={hp(1)}
                textcolor={color.white}
                marginvertical={hp(2)}
                flexdirection="row"
                // alignitems="center"
                fontfamily={familyFont.reg}
                onpress={() => {
                  // onRegister();
                }}
                Icon={
                  <Image
                    style={styles.partners}
                    source={Images.partners}
                    resizeMode="contain"
                  />
                }
              />;
            })} */}
            <View
              style={{
                flexDirection: 'column-reverse',
                flex: 1,
              }}>
              <CustomButton
                title="Play Full Story"
                fontsize={Size(2.1)}
                textcolor={color.primary}
                fontfamily={familyFont.semiBold}
                backgroundcolor={color.white}
                borderradius={hp(1)}
                padding={hp(2)}
                flexdirection="row"
                alignitems="center"
                textalign="center"
                marginvertical={hp(3)}
                onpress={() => {
                  refRBSheet?.current?.close();
                  nav.navigate('PlayFullStory', {url: likeStoryStatus?.url});
                }}
                Icon={
                  <Feather name="play-circle" size={30} color={color.primary} />
                }
              />
            </View>
          </View>
        ) : (
          <KeyboardAvoidingView
            keyboardVerticalOffset={100}
            behavior="padding"
            style={{flex: 1}}
            enabled>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: hp(2),
                  paddingHorizontal: wp(7),
                }}>
                <View />

                <CustomText
                  title={
                    comments?.story?.get_story_comment?.length
                      ? comments?.story?.get_story_comment?.length + ' Comments'
                      : 0 + ' Comments'
                  }
                  fontsize={Size(1.8)}
                  textcolor={color.white}
                  fontfamily={familyFont.bold}
                  flexdirection="row"
                  paddingHorizontal={wp(7)}
                  justifycontent="center"
                  Icon={
                    <Image
                      style={styles.chat2}
                      source={Images.chat}
                      resizeMode="contain"
                    />
                  }
                />
                <TouchableOpacity style={styles.bookmark}>
                  <AntDesign
                    name="close"
                    size={25}
                    color={color.white}
                    onPress={() => {
                      setIsComment(false);
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderTopWidth: hp(0.15),
                  borderColor: color.btnColor,
                  marginBottom: hp(1.8),
                }}
              />
              <View style={styles.header5}>
                {loading && (
                  <View
                    style={{
                      position: 'absolute',
                      paddingTop: hp(25),
                      backgroundColor: 'rgba(245, 245, 245, 0.3)',
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
                <FlatList
                  data={comments?.story?.get_story_comment}
                  style={{flex: 1}}
                  renderItem={renderComments}
                  keyExtractor={item => item?.id}
                />
                {/* <FlatList data={likeStoryStatus?.get_story_comment} /> */}
              </View>
              <View
                style={{
                  alignContent: 'flex-end',
                  flexDirection: 'column-reverse',
                  paddingHorizontal: wp(3),
                }}>
                {!joinChat && (
                  <CustomButton
                    title="Join the Discussion"
                    fontsize={Size(2.1)}
                    textcolor={color.primary}
                    fontfamily={familyFont.semiBold}
                    backgroundcolor={color.white}
                    borderradius={hp(1)}
                    padding={hp(2)}
                    flexdirection="row"
                    alignitems="center"
                    textalign="center"
                    marginvertical={hp(3)}
                    onpress={() => {
                      setJoinChat(true);
                    }}
                    Icon={
                      <ChatIcon name="chat" size={30} color={color.primary} />
                    }
                  />
                )}
                {joinChat && (
                  <CustomTextInput
                    placeholder={'Add your comment here...'}
                    borderradius={hp(1.5)}
                    borderwidth={wp(0.6)}
                    bordercolor={color.border}
                    bgcolor={color.white}
                    paddinghorizontal={hp(2)}
                    flexdirection="row"
                    alignitems={'center'}
                    value={comment}
                    multiline={true}
                    // numberOfLines={6}
                    justifycontent="space-between"
                    marginTop={Platform.OS === 'android' ? hp(2) : hp(5)}
                    marginbottom={hp(5)}
                    onchangetext={val => setComment(val)}
                    paddingverti={Platform.OS === 'android' ? hp(0.2) : hp(2)}
                    isButton={true}
                    fontfamily={familyFont.semiBold}
                    fontsize={Size(1.8)}
                    fontsize2={Size(1.4)}
                    width2={wp(70)}
                    oneyepress={
                      () => {
                        postComment(
                          token,
                          userId,
                          likeStoryStatus?.id,
                          comment,
                        );
                      }
                      // dispatch(

                      // commentsStory({
                      //   token: token,
                      //   user_id: userId,
                      //   story_id: likeStoryStatus[0]?.id,
                      //   comment: comment,
                      // }),
                      // )
                    }
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </RBSheet>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            paddingTop: hp(50),
            backgroundColor: 'rgba(245, 245, 245, 0.3)',
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
    </View>
  );
};

export default StoryPlay;
