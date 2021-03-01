import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";

export default function AddText({ handleAdd, inputRef }) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add new Task</Text>
      <TextInput
        ref={inputRef}
        onChangeText={(text) => setText(text)}
        style={styles.input}
        multiline
        placeholder="Enter text..."
      />
      <TouchableOpacity style={styles.btnStyle} onPress={() => handleAdd(text)}>
        <Text style={styles.btnText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    paddingTop: "20%",
  },
  input: {
    marginBottom: 100,
    backgroundColor: "#fff",
    color: colors.dark,
    height: 50,
    fontSize: 16,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
  },
  btnStyle: {
    backgroundColor: colors.success,
    padding: 11,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  text: {
    marginBottom: 25,
    color: "#A93238",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
