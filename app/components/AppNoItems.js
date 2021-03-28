import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

export default function AppBox(props) {
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LanguageContext);

  return (
    <View
      style={[
        styles.noItemsContainer,
        { borderColor: theme.themes.appBox.borderColor[theme.current] },
      ]}
    >
      <Text
        style={[
          styles.noItemsText,
          { color: theme.themes.appBox.textColor[theme.current] },
        ]}
      >
        {lang.languages.noItemsToShow.message[lang.current]}
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
