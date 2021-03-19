import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import colors from "../../config/colors";
import { LanguageContext } from "../../context/LanguageContext";

export default function EditTask(props) {
  const { languages, currentLanguage } = useContext(LanguageContext);

  const [input, setInput] = useState(props.taskToEdit.name.toString());

  const handleEdit = () => {
    if (input.length < 1) {
      Alert.alert(
        `${languages.alerts.requiredField.title[currentLanguage]}`,
        `${languages.alerts.requiredField.message[currentLanguage]}`,
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      props.handleEditTask(props.taskToEdit.key, input);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {languages.tasks.editTask[currentLanguage]}
      </Text>
      <TextInput
        onChangeText={(text) => setInput(text)}
        style={styles.input}
        multiline
        placeholder={languages.inputPlaceholder[currentLanguage]}
        value={input}
      />
      <TouchableOpacity style={styles.btnEdit} onPress={handleEdit}>
        <Text style={styles.btnEditText}>
          {languages.saveButton[currentLanguage]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCancel}
        onPress={() => props.setModalVisible(false)}
      >
        <Text style={styles.btnCancelText}>
          {languages.cancelButton[currentLanguage]}
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
    fontSize: 20,
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
    padding: 11,
    borderRadius: 5,
    marginTop: 7,
  },
  btnEditText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
  btnCancel: {
    height: 50,
    backgroundColor: colors.danger,
    justifyContent: "center",
    padding: 11,
    borderRadius: 5,
    marginVertical: 5,
  },
  btnCancelText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
