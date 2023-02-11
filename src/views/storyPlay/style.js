import {StyleSheet} from 'react-native';
import {wp, hp, Size, color, Images, IOS} from '../../utils/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.bg2,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  header2: {
    height: hp(9),
    alignItems: 'center',
    flexDirection: 'row',
  },
  profile: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(2),
  },
  partners: {
    width: wp(7),
    height: wp(7),
    marginRight: wp(3),
  },
  chat: {
    width: wp(7),
    height: wp(7),
    marginLeft: hp(2),
  },
  upload: {
    width: wp(7),
    height: wp(7),
  },
  logo: {
    tintColor: color.white,
  },
  bookmark: {
    backgroundColor: color.primary,
    padding: hp(1.5),
    borderRadius: hp(1),
  },
  ////////

  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  sideBar: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: '14%',
    height: '50%',
    right: '2%',
    bottom: 110,
  },
  feedType: {
    position: 'absolute',
    width: hp(60),
    top: hp(10),
    alignSelf: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  pageContainer: {
    flex: 1,
    width: wp(100),
    height: hp(50),
    top: 0,
  },
  playBtn: {
    position: 'absolute',
    width: hp(12),
    heihpt: hp(12),
    alignSelf: 'center',
    resizeMode: 'contain',
    top: hp(44),
    opacity: 0.5,
  },
  feedContent: {
    position: 'absolute',
    flexDirection: 'column',
    width: '60%',
    left: '3%',
    bottom: 95,
  },
});

export default styles;
