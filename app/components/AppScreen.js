import React, { useContext } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../config/colors";

function Screen({ children }) {
  // Contexts
  const { isLightTheme } = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <View style={styles.screen}>
        <View style={styles.view}>{children}</View>
      </View>
      <StatusBar
        backgroundColor={isLightTheme ? colors.dodgerblue : colors.dark}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
