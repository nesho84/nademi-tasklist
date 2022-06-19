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

export default function AddLabel({ handleAddLabel, lang }) {
  const [label, setLabel] = useState("");
  const [labelColor, setLabelColor] = useState(colors.labelBgColors[0]);

  const handleAdd = () => {
    if (label.length < 1) {
      Alert.alert(
        `${lang.languages.alerts.requiredField.title[lang.current]}`,
        `${lang.languages.alerts.requiredField.message[lang.current]}`,
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      handleAddLabel(label, labelColor);
      setLabel("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: labelColor }]}>
        {lang.languages.labels.newLabel[lang.current]}
      </Text>

      <TextInput
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setLabel(text)}
        style={styles.input}
        placeholder={lang.languages.inputPlaceholder[lang.current]}
      />

      <AppColorPicker labelColor={labelColor} handleLabelColor={setLabelColor} />

      <TouchableOpacity
        style={[styles.btnAdd, { backgroundColor: labelColor }]}
        onPress={handleAdd}
      >
        <Text style={styles.btnAddText}>
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
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.light,
    borderBottomColor: "#DEE9F3",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  btnAdd: {
    height: 50,
    justifyContent: "center",
    padding: 11,
    borderRadius: 5,
  },
  btnAddText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
});