import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {hp, wp} from './responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InVisible from 'react-native-vector-icons/MaterialIcons';
const CustomTextInput = ({
  placeholder,
  numberOfLines,
  multiline,
  marginhorizontal,
  marginbottom,
  marginvertical,
  elevation,
  bgcolor,
  bordercolor,
  borderradius,
  borderwidth,
  paddinghorizontal,
  onchangetext,
  paddingverti,
  value,
  isSecure,
  isPassword,
  flexdirection,
  alignitems,
  path,
  justifycontent,
  isphoneauth,
  isSearch,
  width,
  oneyepress,
  height,
  fontfamily,
  shadowcolor,
  shadowopacity,
  shadowrdius,
  shadowoffset,
  eleva,
  marginTop,
  isButton,
  fontsize,
  fontsize2,
  width2,
}) => (
  <View
    style={{
      borderColor: bordercolor,
      borderRadius: borderradius,
      borderWidth: borderwidth,
      backgroundColor: bgcolor,
      elevation: elevation,
      marginHorizontal: marginhorizontal,
      marginBottom: marginbottom,
      marginVertical: marginvertical,
      marginTop: marginTop,
      paddingHorizontal: paddinghorizontal,
      paddingVertical: paddingverti,
      flexDirection: flexdirection,
      justifyContent: justifycontent,
      alignItems: alignitems,
      width: width,
      height: height,
    }}>
    {/* Search icon*/}
    {isSearch && <AntDesign name="eye" size={10} color="red" />}
    {/* password icon*/}

    {isphoneauth && (
      <Image
        style={{
          height: hp(4),
          width: wp(12),
          marginHorizontal: wp(2),
          alignSelf: 'center',
        }}
        source={path}
      />
    )}
    {isphoneauth && <AntDesign name="eye" size={10} color="red" />}

    <TextInput
      placeholder={placeholder}
      style={{fontFamily: fontfamily, fontSize: fontsize2, width: width2}}
      onChangeText={onchangetext}
      value={value}
      secureTextEntry={isSecure}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
    {isPassword && (
      <TouchableOpacity onPress={oneyepress}>
        {!isSecure ? (
          <AntDesign name="eye" size={10} color="red" />
        ) : (
          <InVisible name="visibility-off" size={20} />
        )}
      </TouchableOpacity>
    )}
    {isButton && (
      <TouchableOpacity onPress={oneyepress}>
        <Text style={{fontFamily: fontfamily, fontSize: fontsize}}>Post</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default CustomTextInput;
