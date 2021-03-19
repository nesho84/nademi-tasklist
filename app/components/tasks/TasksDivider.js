import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";

export default function TasksDivider({ checkedTasks }) {
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);

  const { languages, currentLanguage } = useContext(LanguageContext);

  return (
    <View style={styles.checkedTasksDividerContainer}>
      <View
        style={[
          styles.listDivider,
          {
            borderColor: themes.tasksDivider.borderColor[currentTheme],
          },
        ]}
      ></View>
      <Text
        style={[
          styles.listDividerText,
          { color: themes.tasksDivider.textColor[currentTheme] },
        ]}
      >
        {`${checkedTasks} ${languages.tasks.tasksDivider[currentLanguage]}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkedTasksDividerContainer: {
    width: "100%",
    marginTop: 7,
    marginBottom: 3,
    paddingHorizontal: 10,
  },
  listDivider: {
    width: "100%",
    borderWidth: 1,
    marginBottom: 1,
  },
  listDividerText: {
    fontSize: 13,
  },
});
