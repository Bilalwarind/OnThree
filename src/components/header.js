import React from 'react';
import {Header} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {hp} from './responsive';
const CustomHeader = ({
  left,
  center,
  right,
  marginverti = hp(3),
  margintop,
}) => {
  return (
    <Header
      style={{marginVertical: hp(3)}}
      backgroundColor="white"
      leftComponent={left}
      centerComponent={center}
      rightComponent={right}
      marginVertical={marginverti}
      marginTop={margintop}
    />
  );
};
export default CustomHeader;
