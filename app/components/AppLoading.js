import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

export default function AppLoading(props) {
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);
  const { languages, currentLanguage } = useContext(LanguageContext);

  return (
    <View
      style={[
        styles.loadingContainer,
        {
          backgroundColor: themes.appLoading.loadingContainer[currentTheme],
        },
      ]}
    >
      <ActivityIndicator
        style={{ paddingBottom: 15 }}
        size={65}
        color={themes.appLoading.indicator[currentTheme]}
      />
      <Text
        style={{
          fontSize: 23,
          color: themes.appLoading.textColor[currentTheme],
        }}
      >
        {languages.appLoading[currentLanguage]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
