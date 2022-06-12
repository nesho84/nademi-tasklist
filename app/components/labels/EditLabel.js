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
import AppColorPicker from "../AppColorPicker";

export default function EditLabel({ labelToEdit, handleEditLabel, lang }) {
  const [input, setInput] = useState(labelToEdit.title);
  const [labelColor, setLabelColor] = useState(labelToEdit.color);

  const handleAdd = () => {
    if (input.length < 1) {
      Alert.alert(
        `${lang.languages.alerts.requiredField.title[lang.current]}`,
        `${lang.languages.alerts.requiredField.message[lang.current]}`,
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      handleEditLabel(labelToEdit.key, input, labelColor);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: labelColor }]}>
        {lang.languages.labels.editLabel[lang.current]}
      </Text>

      <TextInput
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setInput(text)}
        style={styles.input}
        placeholder={lang.languages.inputPlaceholder[lang.current]}
        value={input}
      />

      <View style={styles.selectColorContainer}>
        <AppColorPicker labelColor={labelColor} handleLabelColor={setLabelColor} />
      </View>

      <TouchableOpacity
        style={[styles.btnEdit, { backgroundColor: labelColor }]}
        onPress={handleAdd}
      >
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    minHeight: 50,
    backgroundColor: "#fff",
    color: colors.dark,
    fontSize: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  selectColorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  btnEdit: {
    height: 50,
    justifyContent: "center",
    marginTop: 24,
    padding: 11,
    borderRadius: 5,
  },
  btnEditText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  }
});
