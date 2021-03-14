import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import colors from "../../config/colors";

export default function EditTask(props) {
  const [input, setInput] = useState(props.taskToEdit.name.toString());

  const handleEdit = () => {
    if (input.length < 1) {
      Alert.alert(
        "Required field",
        "Please insert at least 3 charachters.",
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
      <Text style={styles.title}>Edit Task</Text>
      <TextInput
        onChangeText={(text) => setInput(text)}
        style={styles.input}
        multiline
        placeholder="Enter text..."
        value={input}
      />
      <TouchableOpacity style={styles.btnEdit} onPress={handleEdit}>
        <Text style={styles.btnEditInput}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCancel}
        onPress={() => props.setModalVisible(false)}
      >
        <Text style={styles.btnCancelText}>CANCEL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    paddingTop: "20%",
  },
  title: {
    marginBottom: 25,
    color: colors.danger,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 100,
    backgroundColor: "#fff",
    color: colors.dark,
    minHeight: 50,
    fontSize: 16,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
  },
  btnEdit: {
    backgroundColor: colors.success,
    padding: 11,
  },
  btnEditInput: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  btnCancel: {
    backgroundColor: colors.danger,
    padding: 11,
    marginVertical: 8,
  },
  btnCancelText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
