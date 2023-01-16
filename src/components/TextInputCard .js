//import liraries
import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { wp, hp, Size, color, Images, IOS, familyFont } from "../utils";
import { TextInputMask } from "react-native-masked-text";

const height = Platform.OS === "ios" ? hp(7) : 55;
// create a component
const InputContainer = ({
  secureTextEntry,
  iconPress,
  iconProp,
  onChangeText,
  value,
  placeholder,
  headertitle,
  type,
  Keyboard,
  iconName,
  autoCapitalize,
  lefticon,
  LefticonPress,
  DailCode,
}) => {
  const _inputRef = useRef(null);
  const setRef = useCallback((node) => {
    if (_inputRef.current) {
      // Make sure to cleanup any events/references added to the last instance
    }
    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, setNativeProps, addEventListeners, measure, etc.
      node.setNativeProps({
        style: { fontFamily: familyFont.bold },
      });
    }
    // Save a reference to the node
    _inputRef.current = node;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.MainView}>
        <View style={[styles.HeaderView]}>
          <Text numberOfLines={1} style={styles.Headertitle}>
            {headertitle}
          </Text>
        </View>
        <View style={styles.textInputView}>
          {/* {lefticon && (
            <Text
              style={{
                fontSize: Size(1.6),
                textAlign: "center",
                fontFamily: familyFont.reg,
                marginRight: wp(2),
              }}
            >
              {lefticon}
            </Text>
          )} */}
          {/* <TextInput
            ref={setRef}
            placeholder={placeholder}
            keyboardType={Keyboard}
            autoCapitalize={autoCapitalize}
            placeholderTextColor={"#9F9F9F"}
            secureTextEntry={secureTextEntry}
            style={{
              paddingLeft: lefticon ? wp(0) : wp(3),
              width: lefticon ? wp(60) : wp(72),
              fontSize: Size(1.6),
              textAlign: "left",
              fontFamily: familyFont.reg,
            }}
            onChangeText={onChangeText}
            value={value}
          /> */}
          <TextInputMask
            placeholder={placeholder}
            type={type}
            onChangeText={onChangeText}
            style={{
              marginTop: hp(2),
              paddingLeft: lefticon ? wp(0) : wp(3),
              width: lefticon ? wp(60) : wp(72),
              fontSize: Size(1.6),
              textAlign: "left",
              fontFamily: familyFont.reg,
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? hp(9) : hp(10.5),
    justifyContent: "center",
    alignItems: "center",
  },
  MainView: {
    height: height,
    // height: hp(7),
    width: wp(88),
    borderRadius: 10,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: color.primary,
  },
  HeaderView: {
    backgroundColor: color.white,
    paddingHorizontal: wp(1),
    marginHorizontal: wp(1),
    position: "absolute",
    top: hp(-1.4),
    left: wp(2),
  },
  Headertitle: {
    height: hp(2.5),
    fontSize: Size(1.4),
    paddingHorizontal: wp(1),
    color: color.primary,
    textAlign: "left",
    fontFamily: familyFont.reg,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    height: height,
    paddingHorizontal: wp(2),
  },
});
//make this component available to the app
export { InputContainer };
