import React from 'react';
import {Platform, Text, View} from 'react-native';
import {hp} from './responsive';

const CustomText = ({
  title,
  title2,
  style,
  textcolor,
  fontsize,
  fontsize2,
  marginhorizontal,
  marginvertical,
  aligntext,
  onpress,
  marginbottom,
  marginTop,
  width,
  numberOfLines,
  lineheight,
  justifycontent,
  borderradius,
  borderwidth,
  bordercolor,
  viewheight,
  viewwidth,
  viewmarginhorizontal,
  fontstyle,
  marginleft,
  marginright,
  backgroundcolor,
  flexdirection,
  padding,
  textdecoration,
  txtborder,
  fontfamily,
  fontfamily2,
  fontweight,
  flex,
  Icon,
  textAlignVertical,
}) => (
  <View
    style={{
      flex: flex,
      height: viewheight,
      width: viewwidth,
      justifyContent: justifycontent,
      borderWidth: borderwidth,
      borderRadius: borderradius,
      borderColor: bordercolor,
      marginHorizontal: viewmarginhorizontal,
      marginLeft: marginleft,
      marginRight: marginright,
      flexDirection: flexdirection,
    }}>
    {Icon}
    <Text
      onPress={onpress}
      numberOfLines={numberOfLines}
      style={{
        color: textcolor,
        fontSize: fontsize,
        marginHorizontal: marginhorizontal,
        textAlign: aligntext,
        textAlignVertical: textAlignVertical,
        marginBottom: marginbottom,
        marginVertical: marginvertical,
        marginTop: marginTop,
        width: width,
        lineHeight: lineheight,
        fontStyle: fontstyle,
        backgroundColor: backgroundcolor,
        padding: padding,
        textDecorationLine: textdecoration,
        borderRadius: txtborder,
        fontFamily: fontfamily,
        fontWeight: fontweight,
      }}>
      <Text
        onPress={onpress}
        numberOfLines={numberOfLines}
        style={{
          color: textcolor,
          fontSize: fontsize2,
          marginHorizontal: marginhorizontal,
          textAlign: aligntext,
          textAlignVertical: textAlignVertical,
          marginBottom: marginbottom,
          marginVertical: marginvertical,
          marginTop: marginTop,
          lineHeight: lineheight,
          fontStyle: fontstyle,
          backgroundColor: backgroundcolor,
          padding: padding,
          textDecorationLine: textdecoration,
          borderRadius: txtborder,
          fontFamily: fontfamily2,
          fontWeight: fontweight,
        }}>
        {title2}
      </Text>
      {title}
    </Text>
  </View>
);

export default CustomText;
