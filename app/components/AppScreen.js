import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function Screen({ children, style }) {
  return (
    <SafeAreaProvider>
      <View style={[styles.screen, style]}>
        <View style={[styles.view, style]}>{children}</View>
      </View>
    </SafeAreaProvider>
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
