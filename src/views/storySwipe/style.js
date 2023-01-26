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
    height: hp(10),
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
  logo: {
    tintColor: color.white,
  },
});

export default styles;
