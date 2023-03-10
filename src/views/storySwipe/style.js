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
  header: {
    paddingHorizontal: wp(5),
  },
  header2: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  profile: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(2.5),
  },
  partners: {
    width: wp(7),
    height: wp(7),
    marginRight: wp(3),
  },
  chat: {
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
