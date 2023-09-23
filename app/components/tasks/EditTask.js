import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import moment from "moment";
import colors from "../../config/colors";
import { Ionicons } from '@expo/vector-icons';

export default function EditTask({ handleEditTask, taskToEdit, lang }) {
  const taskToEditDateTime = taskToEdit.reminder?.dateTime ?? null;
  const dateTimeToString = (date) => {
    return date ? moment(date).format("DD.MM.YYYY HH:mm") : lang.languages.setReminder[lang.current];
  }
  const [taskInput, setTaskInput] = useState(taskToEdit.name.toString());
  const [inputReminder, setInputReminder] = useState(dateTimeToString(taskToEditDateTime));
  const [inputRActive, setInputRActive] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(taskToEditDateTime);

  const hasActiveReminder = () => {
    const currentDateTime = new Date();
    const reminderDateTime = new Date(taskToEditDateTime);
    const timeDifferenceInSeconds = Math.max(0, (reminderDateTime - currentDateTime) / 1000);
    if (taskToEditDateTime && timeDifferenceInSeconds > 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleDateConfirm = (dateTime) => {
    const currentDateTime = new Date();
    const reminderDateTime = new Date(dateTime);
    const timeDifferenceInSeconds = Math.max(0, (reminderDateTime - currentDateTime) / 1000);
    if (timeDifferenceInSeconds <= 0) {
      Alert.alert(
        `${lang.languages.alerts.reminderDateTime.title[lang.current]}`,
        `${lang.languages.alerts.reminderDateTime.message[lang.current]}`,
        [{ text: "OK" }],
        { cancelable: false }
      );
      setDatePickerVisible(false);
      return;
    } else {
      setSelectedDateTime(dateTime);
      setInputReminder(dateTimeToString(dateTime));
      setInputRActive(true);
      setDatePickerVisible(false);
    }
  };

  const handleEdit = () => {
    if (taskInput.length < 1) {
      Alert.alert(
        `${lang.languages.alerts.requiredInputField.title[lang.current]}`,
        `${lang.languages.alerts.requiredInputField.message[lang.current]}`,
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      handleEditTask({
        ...taskToEdit,
        name: taskInput,
        reminder: {
          ...taskToEdit.reminder,
          dateTime: selectedDateTime
        }
      });
      setTaskInput("");
      setSelectedDateTime("");
      setInputReminder("");
    }
  };

  return (
    <View style={styles.editTaskContainer}>
      <Text style={styles.title}>
        {lang.languages.tasks.editTask[lang.current]}
      </Text>

      <TextInput
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setTaskInput(text)}
        style={styles.editTaskInput}
        placeholder={lang.languages.inputPlaceholder[lang.current]}
        value={taskInput}
      />

      <TouchableOpacity
        style={[
          styles.inputDateContainer,
          { backgroundColor: hasActiveReminder() || inputRActive ? colors.light : colors.checkedItemDark }
        ]}
        onPress={() => setDatePickerVisible(true)}>
        <TextInput
          style={{
            color: hasActiveReminder() || inputRActive ? colors.success : colors.muted,
          }}
          placeholder={lang.languages.setReminder[lang.current]}
          value={inputReminder}
          editable={false}
        />
        <Ionicons
          name={hasActiveReminder() || inputRActive ? "notifications" : "notifications-off"}
          size={20}
          color={hasActiveReminder() || inputRActive ? colors.success : colors.muted}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        locale="de_DE"
        is24Hour
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />

      <TouchableOpacity style={styles.btnEdit} onPress={handleEdit}>
        <Text style={styles.btnEditText}>
          {lang.languages.saveButton[lang.current]}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  editTaskContainer: {
    width: "80%",
  },
  title: {
    marginBottom: 25,
    color: colors.danger,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  editTaskInput: {
    minHeight: 50,
    marginBottom: 1,
    backgroundColor: colors.white,
    color: colors.dark,
    fontSize: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 35,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderRadius: 5,
    paddingHorizontal: 10
  },
  inputDate: {
    backgroundColor: colors.white,
    borderBottomColor: "#DEE9F3",
  },
  btnEdit: {
    height: 50,
    backgroundColor: colors.success,
    justifyContent: "center",
    marginTop: 8,
    padding: 11,
    borderRadius: 5,
  },
  btnEditText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});