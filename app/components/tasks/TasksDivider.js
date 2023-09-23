import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

export default function TasksDivider({ checkedTasks, lang }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.checkedTasksDividerContainer}>
      <View
        style={[
          styles.listDivider,
          {
            borderColor: theme.themes.tasksDivider.borderColor[theme.current],
          },
        ]}
      ></View>
      <Text
        style={[
          styles.listDividerText,
          { color: theme.themes.tasksDivider.textColor[theme.current] },
        ]}
      >
        {`${checkedTasks} ${lang.languages.tasks.tasksDivider[lang.current]}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkedTasksDividerContainer: {
    width: "100%",
    marginVertical: 2,
    paddingHorizontal: 7,
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
