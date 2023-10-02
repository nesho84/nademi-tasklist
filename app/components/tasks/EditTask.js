import React, { useState, useRef } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import Hyperlink from 'react-native-hyperlink'
import moment from "moment";
import colors from "../../config/colors";
import { Ionicons } from '@expo/vector-icons';

export default function EditTask({ handleEditTask, taskToEdit, lang }) {
  const taskToEditDateTime = taskToEdit.reminder?.dateTime ?? null;
  const dateTimeToString = (date) => {
    return date ? moment(date).format("DD.MM.YYYY HH:mm") : lang.languages.setReminder[lang.current];
  }
  const [taskInput, setTaskInput] = useState(taskToEdit.name.toString());
  const [taskInputActive, setTaskInputActive] = useState(false);
  const [inputReminder, setInputReminder] = useState(dateTimeToString(taskToEditDateTime));
  const [inputRActive, setInputRActive] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(taskToEditDateTime);

  const scrollViewRef = useRef(null);

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

  const handleTextInputFocus = () => {
    if (Platform.OS === 'android') {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 200);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => setTaskInputActive(false)}>
      <View style={styles.container}>
        {/* Show as TaskText or TaskInput */}
        <View style={[
          styles.textInputContainer,
          { backgroundColor: taskInputActive ? colors.lighterDark : colors.lightDark }
        ]}>
          <ScrollView ref={scrollViewRef}>
            {taskInputActive === false ? (
              // Inactive Input
              <TouchableWithoutFeedback onPress={() => setTaskInputActive(true)}>
                <View style={styles.textInputInactive}>
                  <Hyperlink
                    linkDefault={true}
                    linkStyle={{ color: '#2980b9' }}
                  >
                    <Text style={{ color: colors.light, fontSize: 15 }}>{taskInput}</Text>
                  </Hyperlink>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              // Active Input
              <View style={styles.textInputActive}>
                <TextInput
                  style={{ color: colors.light, fontSize: 15 }}
                  onFocus={handleTextInputFocus}
                  multiline={true}
                  autoFocus={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(text) => setTaskInput(text)}
                  placeholder={lang.languages.inputPlaceholder[lang.current]}
                  value={taskInput}
                />
              </View>
            )}
          </ScrollView>
        </View>

        {/* Custom DateTime picker input */}
        <TouchableOpacity
          style={styles.inputDateContainer}
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

        {/* Save button */}
        <TouchableOpacity style={styles.btnEdit} onPress={handleEdit}>
          <Text style={styles.btnEditText}>
            {lang.languages.saveButton[lang.current]}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.uncheckedItemDark,
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 10,
    justifyContent: 'center',
  },
  textInputInactive: {
    padding: 10,
    borderRadius: 5,
  },
  textInputActive: {
    padding: 10,
    borderRadius: 5,
  },
  inputDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 35,
    marginBottom: 10,
    backgroundColor: colors.lightDark,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.uncheckedItemDark,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  btnEdit: {
    height: 50,
    marginBottom: 10,
    backgroundColor: colors.success,
    justifyContent: "center",
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