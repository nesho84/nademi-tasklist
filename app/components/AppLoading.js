import React, { useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function AppLoading({ lang }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.loadingContainer,
        {
          backgroundColor:
            theme.themes.appLoading.loadingContainer[theme.current],
        },
      ]}
    >
      <ActivityIndicator
        style={{ paddingBottom: 15 }}
        size={65}
        color={theme.themes.appLoading.indicator[theme.current]}
      />
      <Text
        style={{
          fontSize: 23,
          color: theme.themes.appLoading.textColor[theme.current],
        }}
      >
        {lang.languages.appLoading[lang.current]}
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
