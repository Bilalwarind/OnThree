import React from 'react';
import {Platform, Text, View} from 'react-native';
import {hp} from './responsive';

const CustomText = ({
  title,
  style,
  textcolor,
  fontsize,
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
  fontweight,
  flex,
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
    <Text
      onPress={onpress}
      numberOfLines={numberOfLines}
      style={{
        color: textcolor,
        fontSize: fontsize,
        marginHorizontal: marginhorizontal,
        textAlign: aligntext,
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
      {title}
    </Text>
  </View>
);

export default CustomText;
