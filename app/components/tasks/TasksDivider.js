import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";

export default function TasksDivider({ checkedTasks, isLightTheme }) {
  return (
    <View style={styles.checkedTasksDividerContainer}>
      <View
        style={[
          styles.listDivider,
          {
            borderColor: isLightTheme ? colors.lightSkyBlue : colors.muted,
          },
        ]}
      ></View>
      <Text
        style={[
          styles.listDividerText,
          { color: isLightTheme ? colors.checkedItemText : colors.muted },
        ]}
      >
        {checkedTasks} Checked Items
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
