import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
// Custom colos Object
import colors from "../config/colors";

export default function AppLoading() {
  // Contexts
  const { isLightTheme } = useContext(ThemeContext);

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
