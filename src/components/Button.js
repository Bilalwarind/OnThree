import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {hp} from './responsive';
const CustomButton = ({
  title,
  borderradius,
  backgroundcolor,
  textcolor,
  style,
  onpress,
  fontsize,
  width,
  padding,
  marginvertical,
  alignSelf,
  textalign,
  textalignvertical,
  alighitems,
  Icon,
  IconRight,
  flexdirection,
  justifycontent,
  marginhori,
  flex,
  marginleft,
  marginright,
  paddinghori,
  paddingverti,
  borderwidth,
  bordercolor,
  marginbottom,
  margintop,
  fontfamily,
  fontweight,
}) => (
  <View
    style={{
      borderRadius: borderradius,
      backgroundColor: backgroundcolor,
      marginVertical: marginvertical,
      width: width,
      alignSelf,
      alignItems: alighitems,
      marginHorizontal: marginhori,
      flex: flex,
      marginLeft: marginleft,
      marginRight: marginright,
      borderWidth: borderwidth,
      borderColor: bordercolor,
      marginBottom: marginbottom,
      marginTop: margintop,
    }}>
    <TouchableOpacity onPress={onpress}>
      <View
        style={{
          flexDirection: flexdirection,
          alignItems: alighitems,
          alignSelf: alignSelf,
          justifyContent: justifycontent,
        }}>
        {Icon}
        <Text
          style={{
            color: textcolor,
            fontSize: fontsize,
            width: width,
            padding: padding,
            textAlign: textalign,
            paddingHorizontal: paddinghori,
            paddingVertical: paddingverti,
            fontFamily: fontfamily,
            fontWeight: fontweight,
            textAlignVertical: textalignvertical,
          }}>
          {title}
        </Text>
        {IconRight}
      </View>
    </TouchableOpacity>
  </View>
);

export default CustomButton;
