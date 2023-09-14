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

export default function EditTask({ handleEditTask, taskToEdit, lang }) {
  const [taskInput, setTaskInput] = useState(taskToEdit.name.toString());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formattedDate, setFormattedDate] = useState(
    taskToEdit.reminderDate && moment(taskToEdit.reminderDate).format('DD.MM.YYYY HH:mm')
  );
  const inputRef = React.createRef();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (dateTime) => {
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
    const formatted = moment(dateTime).format('DD.MM.YYYY HH:mm');
    setFormattedDate(formatted);
    setSelectedDate(dateTime);
    inputRef.current.blur(); // This will hide the keyboard
  };

  const handleEdit = () => {
    if (taskInput.length < 1) {
      Alert.alert(
        `${lang.languages.alerts.requiredField.title[lang.current]}`,
        `${lang.languages.alerts.requiredField.message[lang.current]}`,
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      if (!selectedDate) {
        setSelectedDate(new Date(taskToEdit.reminderDate));
      }
      handleEditTask(taskToEdit.key, taskInput, selectedDate);
      setTaskInput("");
      setSelectedDate("");
      setFormattedDate("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {lang.languages.tasks.editTask[lang.current]}
      </Text>
      <TextInput
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setTaskInput(text)}
        style={styles.input}
        placeholder={lang.languages.inputPlaceholder[lang.current]}
        value={taskInput}
      />
      <View style={styles.remminder}>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={{ color: colors.light }}>Reminder...</Text>
          <TextInput
            style={styles.inputdate}
            ref={inputRef}
            placeholder="Select Date"
            value={formattedDate}
            editable={false} // Make the input non-editable
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          locale="de_DE"
          is24Hour
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <TouchableOpacity style={styles.btnEdit} onPress={handleEdit}>
        <Text style={styles.btnEditText}>
          {lang.languages.saveButton[lang.current]}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  title: {
    marginBottom: 25,
    color: colors.danger,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    minHeight: 50,
    marginBottom: 1,
    backgroundColor: colors.white,
    color: colors.dark,
    fontSize: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  inputdate: {
    minHeight: 40,
    marginTop: 5,
    marginBottom: 1,
    backgroundColor: colors.white,
    color: colors.dark,
    fontSize: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  btnEdit: {
    height: 50,
    backgroundColor: colors.success,
    justifyContent: "center",
    marginTop: 8,
    padding: 11,
    borderRadius: 5,
  },
  remminder: {
    marginTop: 10,
  },
  btnEditText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
});
