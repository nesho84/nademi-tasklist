import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddText({ handleAdd, inputRef }) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add new Item</Text>
      <TextInput
        ref={inputRef}
        onChangeText={(text) => setText(text)}
        style={styles.input}
        multiline
        placeholder="Enter text..."
      />
      <TouchableOpacity style={styles.btnStyle} onPress={() => handleAdd(text)}>
        <Text style={styles.btnText}>Add</Text>
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
    color: "#000",
    height: 50,
    borderColor: "#F3F3F3",
    borderBottomColor: "#C9C6C7",
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
  },
  btnStyle: {
    backgroundColor: "#A93238",
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
