//import liraries
import React from "react";
import { View } from "react-native";
import { hp, wp } from "./responsive";
import UserInput from "../constants/CutomTextInput";
import { styles } from "../styles";
import { color } from "react-native-elements";

// create a component
const Searchbar = ({ search, onChangeText, iconPress }) => {
  return (
    <View style={styles.inputCon}>
      <View style={styles.InputMCon}>
        <UserInput
          backgroundColor={"white"}
          placeholder="Tell us what you need"
          iconName={Images.search}
          placeholderTextColor={"#30302f"}
          iconColor={color.lightGrey}
          iconSize={Size(2)}
          iconProp={{
            name: "search",
            type: "ionicon",
          }}
          value={search}
          marginHorizontal={wp(5)}
          textStyle={{ fontSize: Size(1.4), paddingVertical: hp(0.3) }}
          onChangeText={onChangeText}
          iconPress={iconPress}
          borderColor={color.darkGrey30}
          width={"90%"}
          borderRadius={wp(3)}
          borderWidth={0.8}
        />
      </View>
    </View>
  );
};

//make this component available to the app
export default Searchbar;
