import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";

export default function AppBox({ isLightTheme }) {
  return (
    <View
      style={[
        styles.noItemsContainer,
        { borderColor: isLightTheme ? colors.dodgerblue : colors.muted },
      ]}
    >
      <Text
        style={[
          styles.noItemsText,
          { color: isLightTheme ? colors.dodgerblue : colors.muted },
        ]}
      >
        No Tasks to show.{"\n\n"}
        <Text>You can use the plus button (+) to create new tasks.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 30,
    padding: 30,
  },
  noItemsText: {
    fontSize: 17,
    textAlign: "center",
  },
});
