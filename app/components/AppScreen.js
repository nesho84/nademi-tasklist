import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../config/colors";

function Screen({ children }) {
  // Contexts
  const { isLightTheme } = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[
            styles.screen,
            {
              backgroundColor: isLightTheme ? colors.white : colors.dark,
            },
          ]}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
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
});

export default Screen;
