import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
// Custom colos Object
import colors from "../config/colors";

export default function AppLoading({ isLightTheme }) {
  return (
    <View
      style={[
        styles.loadingContainer,
        {
          backgroundColor: isLightTheme ? colors.light : colors.dark,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 30,
          color: isLightTheme ? colors.muted : colors.light,
        }}
      >
        Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
