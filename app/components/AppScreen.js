import React, { useContext } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

function Screen({ children }) {
  // Contexts
  const { isLightTheme, themes, toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <View style={styles.screen}>
        <View style={styles.view}>{children}</View>
      </View>
      <StatusBar
        backgroundColor={
          isLightTheme ? themes.light.background : themes.dark.background
        }
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
