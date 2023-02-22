import {StyleSheet} from 'react-native';
import {wp, hp, Size, color, Images, IOS} from '../../utils/';

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    paddingHorizontal: wp(5),
    backgroundColor: color.white,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(7),
    marginBottom: hp(3),
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header2: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.gray,
    padding: wp(0.7),
    borderRadius: wp(2),
    marginBottom: hp(4),
  },
  logo: {
    width: wp(15),
    tintColor: '#000',
  },
  profile: {
    width: wp(20),
  },
  storyImg: {
    height: hp(40),
    width: wp(30),
    resizeMode: 'contain',
    borderRadius: wp(4),
  },
  story: {
    width: wp(50),
    height: wp(100),
    borderRadius: wp(3),
    backgroundColor: color.primary,
    alignSelf: 'center',
  },
  storyDetail: {
    flex: 0.7,
    alignItems: 'flex-start',
  },
  ViewStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: wp(100),
  },
  socialIcon: {
    width: wp(20),
    height: wp(15),
    margin: wp(3),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
});

export default styles;
