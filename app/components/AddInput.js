import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";

export default function AddInput(props) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new Task</Text>
      <TextInput
        ref={props.inputRef}
        onChangeText={(text) => setText(text)}
        style={styles.input}
        multiline
        placeholder="Enter text..."
      />
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => props.handleAdd(text)}
      >
        <Text style={styles.btnAddInput}>SAVE</Text>
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
  btnAdd: {
    backgroundColor: colors.success,
    padding: 11,
  },
  btnAddInput: {
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
