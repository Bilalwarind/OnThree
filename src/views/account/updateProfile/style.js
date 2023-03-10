import {StyleSheet} from 'react-native';
import {wp, hp, Size, color, Images, IOS} from '../../../utils/';

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    paddingHorizontal: wp(5),
    backgroundColor: color.bg,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  header: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp(1),
    paddingHorizontal: wp(5),
  },
  header1: {
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    marginTop: hp(1),
  },
  header2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: wp(5),
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
    width: wp(18),
    height: wp(18),
    borderRadius: wp(18),
    marginRight: wp(5),
  },
  storyImg: {
    height: hp(22),
    width: wp(20),
    resizeMode: 'contain',
    borderRadius: wp(4),
  },
  story: {
    flex: 0.3,
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
