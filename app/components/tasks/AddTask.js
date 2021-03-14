import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

export default function AddTask(props) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.length < 1) {
      Alert.alert(
        "Required field",
        "Please insert at least one or more charachters.",
        [{ task: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      props.handleAddTask(task);
      setTask("");
    }
  };

  return (
    <View style={styles.addTaskContainer}>
      <TextInput
        ref={props.inputRef}
        onChangeText={(text) => setTask(text)}
        style={styles.addTaskInput}
        multiline
        placeholder="Enter text..."
      />
      <TouchableOpacity
        style={{ backgroundColor: props.currentLabelColor }}
        onPress={handleAdd}
      >
        <MaterialIcons name="add" size={45} color={colors.light} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addTaskContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: colors.muted,
    borderTopWidth: 0.2,
    padding: 10,
  },
  addTaskInput: {
    flex: 1,
    height: 46,
    backgroundColor: colors.light,
    color: colors.dark,
    fontSize: 16,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    marginRight: 5,
  },
  addTaskButton: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
