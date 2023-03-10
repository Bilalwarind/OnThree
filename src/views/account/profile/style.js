import {StyleSheet} from 'react-native';
import {wp, hp, Size, color, Images, IOS} from '../../../utils/';

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    padding: wp(5),
    backgroundColor: color.white,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: hp(3),
  },
  logo: {
    marginRight:wp(1.5),
    tintColor: '#000',
  },
  profile: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(18),
  },
  storyImg: {
    height: hp(22),
    width: wp(35),
    resizeMode: 'contain',
    borderRadius: wp(4),
  },
  story: {
    flex: 0.3,
  },
  storyDetail: {
    flex: 0.7,
    alignItems: 'flex-start',
    paddingLeft: wp(15),
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
