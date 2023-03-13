import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import {wp, hp, Size, color, Images, IOS} from '../../utils/';
const Splash = ({params}) => {
  const navigation = useNavigation();
  const {token, userData} = useSelector(state => state.auth);

  setTimeout(async () => {
    if (userData) {
      navigation.replace('StoryPlay');
    } else {
      navigation.replace('Login');
    }
  }, 2000);
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.ViewStyle}>
        <Image style={styles.logo} source={Images.logo} resizeMode="contain" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: hp(20),
    width: wp(50),
    tintColor: '#fff',
  },
  ViewStyle: {
    backgroundColor: '#000',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: wp(100),
  },
});
export default Splash;
