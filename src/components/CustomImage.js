import React from 'react';
import {Text, View, Image} from 'react-native';

const CustomImage = ({
  path,
  height,
  width,
  margin,
  marginhori,
  marginver,
  alignself,
  borderwidth,
  borderradius,
  flex,
  bordercolor,
}) => {
  return (
    <View
      style={{
        borderColor: bordercolor,
        borderRadius: borderradius,
        borderWidth: borderwidth,
      }}>
      <Image
        style={{
          height: height,
          width: width,
          margin: margin,
          marginHorizontal: marginhori,
          marginVertical: marginver,
          alignSelf: alignself,
          borderWidth: borderwidth,
          borderRadius: borderradius,
          flex: flex,
          borderColor: bordercolor,
        }}
        source={path}
      />
    </View>
  );
};

export default CustomImage;
