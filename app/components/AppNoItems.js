import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

export default function AppBox(props) {
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);
  const { languages, currentLanguage } = useContext(LanguageContext);

  return (
    <View
      style={[
        styles.noItemsContainer,
        { borderColor: themes.appBox.borderColor[currentTheme] },
      ]}
    >
      <Text
        style={[
          styles.noItemsText,
          { color: themes.appBox.textColor[currentTheme] },
        ]}
      >
        {languages.noItemsToShow.message[currentLanguage]}
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
