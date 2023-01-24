import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { color } from "../Utils/assets/color";
const Loader = ({ params }) => (
  <View
    style={{
      alignSelf: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,.3)",
      flex: 1,
      alignContent: "center",
    }}
  >
    <ActivityIndicator
      animating
      color={color.PRIMARY_ORANGE}
      size={"large"}
      style={{
        alignSelf: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,.3)",
        flex: 1,
        alignContent: "center",
      }}
    />
  </View>
);

export default Loader;
