import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

function Screen({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.themes.appScreen.screen[theme.current],
          }}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
      <StatusBar
        backgroundColor={theme.themes.appScreen.statusBar[theme.current]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
