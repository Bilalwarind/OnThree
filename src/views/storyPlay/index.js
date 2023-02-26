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
} from 'react-native';
import {wp, hp, Size, color, Images, IOS, familyFont} from '../../utils/';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllStories, likeStory, commentsStory, logoutUser} from '../../redux';
import styles from './style';
import VideoPlayer from 'react-native-video-player';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {createThumbnail} from 'react-native-create-thumbnail';

const StoryPlay = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const refRBSheet = useRef();
  const {allStoriesData, isLoading} = useSelector(state => state.home);
  const {token, userId} = useSelector(state => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [likeStoryStatus, setLikeStoryStatus] = useState({});
  const [val, setVal] = useState('');
  const [position, setPosition] = useState({
    show: 0,
    top: 70,
  });
  const data = {
    token: token,
    user_id: userId,
  };
  useEffect(() => {
    dispatch(getAllStories(data));
  }, []);
  const createThumbnails = uri => {
    createThumbnail({
      url: uri,
      timeStamp: 5000,
    })
      .then(response => {
        setVal(response.path);
      })
      .catch(err => console.log({err}));
  };
  const renderItems = ({item, index}) => {
    // createThumbnails(item?.url);
    return (
      <View>
        <VideoPlayer
          video={{
            uri: item?.url,
          }}
          videoWidth={wp(100)}
          videoHeight={hp(100)}
          // autoplay={true}
          // thumbnail={{
          //   uri: val,
          // }}
        />
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
                          dispatch(logoutUser());
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
                  source={Images.profile}
                  resizeMode="contain"
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
                    top: 0,
                  });
                  setLikeStoryStatus(item);
                  refRBSheet.current.open();
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
          </View>
        </View>
        <RBSheet
          height={hp(76)}
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
          <View style={{backgroundColor: '#0F0F0F', padding: wp(4)}}>
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
                title={likeStoryStatus?.get_story_likes?.length}
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
                  dispatch(
                    likeStory({
                      token: token,
                      user_id: userId,
                      story_id: likeStoryStatus?.id,
                    }),
                  );
                }}
                Icon={
                  <AntDesign
                    name="hearto"
                    size={22}
                    color={color.white}
                    style={{paddingLeft: hp(2)}}
                  />
                }
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
                  '';
                }}
                Icon={
                  <Image
                    style={styles.chat}
                    source={Images.chat}
                    resizeMode="contain"
                  />
                }
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
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
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
                Icon={<Entypo name="link" size={25} color={color.white} />}
                // {<Feather name="external-link" size={25} color={color.white} />}
              />
            </View>
            <View
              style={{
                borderTopWidth: hp(0.15),
                borderColor: color.btnColor,
              }}
            />
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
              Icon={
                <Image
                  style={styles.partners}
                  source={Images.partners}
                  resizeMode="contain"
                />
              }
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
              Icon={
                <Feather name="play-circle" size={30} color={color.primary} />
              }
            />
          </View>
        </RBSheet>
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
        data={allStoriesData}
        keyExtractor={item => item?.id}
        renderItem={renderItems}
      />
    </View>
  );
};

export default StoryPlay;
