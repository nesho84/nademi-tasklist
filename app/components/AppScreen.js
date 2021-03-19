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
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: themes.appScreen.screen[currentTheme],
          }}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
      <StatusBar backgroundColor={themes.appScreen.statusBar[currentTheme]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
