import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../config/colors";
import { ThemeContext } from "../context/ThemeContext";
import { TasksContext } from "../context/TasksContext";

export default function SettingsScreen(props) {
  // Contexts
  const { isLightTheme, toggleTheme } = useContext(ThemeContext);
  const { tasks, clearAllTasks } = useContext(TasksContext);

  const handleDeleteAll = () => {
    if (tasks.length === 0) {
      Alert.alert(
        "",
        "Nothing to delete.",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
      return;
    } else {
      Alert.alert(
        "Delete all items in the Storage!",
        "Are you sure?",
        [
          {
            text: "Yes",
            onPress: () => clearAllTasks(),
          },
          {
            text: "No",
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isLightTheme ? colors.white : colors.dark,
        },
      ]}
    >
      <View
        style={[
          styles.menu,
          {
            borderColor: isLightTheme ? colors.lightSkyBlue : colors.muted,
            borderBottomWidth: 1,
          },
        ]}
      >
        <Text style={styles.title}>DISPLAY OPTIONS</Text>
        <View style={styles.actionContainer}>
          <Text style={styles.action}>Theme</Text>
          <Icon
            color={isLightTheme ? colors.dark : colors.lightDodgerBlue}
            type="FontAwesome5"
            size={35}
            name={isLightTheme ? "toggle-off" : "toggle-on"}
            onPress={toggleTheme}
          />
        </View>
      </View>
      <View style={styles.menu}>
        <Text style={styles.title}>TASKS</Text>
        <View style={styles.actionContainer}>
          <Text style={styles.action}>Delete All</Text>
          <View style={styles.deleteButton}>
            <Button
              color={colors.danger}
              title="DELETE"
              onPress={handleDeleteAll}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 16,
  },
  menu: {
    paddingBottom: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    color: colors.lightDodgerBlue,
    paddingBottom: 10,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  action: {
    fontSize: 17,
    color: colors.muted,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    fontSize: 10,
  },
});
