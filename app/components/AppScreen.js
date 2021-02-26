import React from "react";
import { StyleSheet, View } from "react-native";

function Screen({ children, style }) {
  return (
    <View style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
