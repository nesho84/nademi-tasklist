import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";

export default function EditInput(props) {
  const [text, setText] = useState(props.taskToEdit.name.toString());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      <TextInput
        ref={props.inputRef}
        onChangeText={(text) => setText(text)}
        style={styles.input}
        multiline
        placeholder="Enter text..."
        value={text.toString()}
      />
      <TouchableOpacity
        style={styles.btnEdit}
        onPress={() => props.handleEdit(props.taskToEdit.key, text)}
      >
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
    color: "#A93238",
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
