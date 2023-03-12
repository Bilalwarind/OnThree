import {StyleSheet} from 'react-native';
import {wp, hp, Size, color, Images, IOS} from '../../../utils/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    backgroundColor: color.bg,
  },
  input: {
    height: hp(14),
    justifyContent: 'center',
  }, 
  close:{
    alignSelf:'flex-end',
    marginTop:hp(3),
    marginRight:hp(1)
  },
  logo: {
    marginTop: hp(3),
    alignSelf: 'center',
    width: wp(45),
    tintColor: '#000',
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
    width: wp(17),
    height: wp(13),
    margin: wp(3),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
});

export default styles;
