import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import { LanguageContext } from "../../context/LanguageContext";

export default function AddTask(props) {
  const { languages, currentLanguage } = useContext(LanguageContext);

  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.length < 1) {
      Alert.alert(
        `${languages.alerts.requiredField.title[currentLanguage]}`,
        `${languages.alerts.requiredField.message[currentLanguage]}`,
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
        placeholder={props.placeholder}
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
    borderTopColor: "#616161",
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
