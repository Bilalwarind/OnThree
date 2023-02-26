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
import {userProfileInfo} from '../../../redux';
import CustomTextInput from '../../../components/CutomTextInput';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style';

const Profile = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const {userProfile, isLoading} = useSelector(state => state.home);
  const {token, userId} = useSelector(state => state.auth);
  const [activeBtn, setActiveBtn] = useState(1);
  const data = {
    token: token,
    user_id: userId,
  };
  useEffect(() => {
    dispatch(userProfileInfo(data));
    const unsubscribe = nav.addListener('focus', () => {
      dispatch(userProfileInfo(data));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  alert(JSON.stringify(userProfile));
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
                userProfile?.profile_image ||
                'https://icon-library.com/images/user-profile-icon/user-profile-icon-24.jpg',
            }}
            resizeMode="contain"
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
        title={`${userProfile?.first_name} ${userProfile?.last_name}`}
        textcolor={color.primary}
        fontsize={Size(2.2)}
        aligntext={'center'}
        fontfamily={familyFont.semiBold}
      />
      <CustomText
        title={userProfile?.about}
        textcolor={color.primary}
        fontsize={Size(1.4)}
        fontfamily={familyFont.reg}
        aligntext={'center'}
        marginvertical={hp(1.5)}
      />
      <CustomButton
        title={userProfile?.slug}
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
          onRegister();
        }}
        Icon=<Image
          style={styles.logo}
          source={Images.chain}
          resizeMode="contain"
        />
      />
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
          width={wp(29)}
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
          width={wp(29)}
          fontfamily={familyFont.meduim}
          onpress={() => {
            setActiveBtn(2);
          }}
        />
        <CustomButton
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
        />
      </View>
      {activeBtn == 1 && (
        <CustomButton
          title="Stories"
          fontfamily={familyFont.reg}
          fontsize={Size(2.2)}
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
      )}
      {activeBtn == 2 && (
        <CustomButton
          title="Bookmarks"
          fontfamily={familyFont.reg}
          fontsize={Size(2.2)}
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
      )}
      {activeBtn == 3 && (
        <CustomButton
          title="Comments"
          fontfamily={familyFont.reg}
          fontsize={Size(2.2)}
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
      )}
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
          onRegister();
        }}
      />
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
            nav.navigate('CreateStory');
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
            onRegister();
          }}
          Icon={<Feather name="search" size={17} color={color.white} />}
        />
      )}
      <View style={{flexDirection: 'row'}}>
        <View style={styles.story}>
          <Image
            style={styles.storyImg}
            source={Images.story}
            resizeMode="contain"
          />
        </View>
        <View style={styles.storyDetail}>
          <CustomText
            title="Jan 1, 2023"
            textcolor={color.primary}
            fontsize={Size(1.1)}
            marginvertical={hp(0.5)}
            fontfamily={familyFont.bold}
          />
          <CustomText
            title="This is a story title here if it..."
            textcolor={color.primary}
            fontsize={Size(1.8)}
            marginvertical={hp(0.5)}
            fontfamily={familyFont.bold}
          />
          <CustomText
            title="This is the description / about for a story it is able to wrap onto the next line and it can even go to three lines"
            textcolor={color.primary}
            fontsize={Size(1.3)}
            marginvertical={hp(0.5)}
            fontfamily={familyFont.meduim}
          />
          <View style={{flexDirection: 'row', marginTop: hp(1)}}>
            <CustomButton
              title="Perserverance"
              fontsize={Size(1.2)}
              backgroundcolor={color.gray}
              borderradius={hp(1)}
              textcolor={color.primary}
              padding={hp(1)}
              paddinghori={hp(2)}
              marginright={wp(2)}
              fontfamily={familyFont.semiBold}
              onpress={() => {}}
            />
            <CustomButton
              title="+2 more"
              fontsize={Size(1.2)}
              backgroundcolor={color.gray}
              borderradius={hp(1)}
              textcolor={color.primary}
              padding={hp(1)}
              paddinghori={hp(2)}
              marginright={wp(2)}
              fontfamily={familyFont.semiBold}
              onpress={() => {}}
            />
          </View>
        </View>
      </View>

      {/* <Dialog visible={isLoading}>
        <Dialog.Content>
          <Paragraph>isLoading</Paragraph>
        </Dialog.Content>
      </Dialog> */}
    </View>
  );
};

export default Profile;
