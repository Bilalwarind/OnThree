import {StyleSheet} from 'react-native';
import {wp, hp, Size, color, Images, IOS} from '../../utils/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg2,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(5),
  },
  header2: {
    height: hp(5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  profile: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(2),
    borderRadius: wp(10),
    overflow: 'hidden',
  },
  profile3: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(2),
    tintColor: color.white,
    overflow: 'hidden',
  },
  profile2: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    backgroundColor: color.white,
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

  header5: {
    paddingHorizontal: wp(5),
    flex: 1,
  },
  header6: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  partners: {
    width: wp(7),
    height: wp(7),
    marginRight: wp(3),
  },
  chat2: {
    width: wp(7),
    height: wp(7),
    marginRight: wp(2),
  },
  bookmark: {
    backgroundColor: color.primary,
    padding: hp(1.5),
    borderRadius: hp(1),
  },
});

export default styles;
