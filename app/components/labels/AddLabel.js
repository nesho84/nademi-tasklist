import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import { LanguageContext } from "../../context/LanguageContext";

export default function AddLabel(props) {
  const { languages, currentLanguage } = useContext(LanguageContext);

  const labelColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];

  const [label, setLabel] = useState("");
  const [labelColor, setLabelColor] = useState(labelColors[0]);

  const handleAdd = () => {
    if (label.length < 1) {
      Alert.alert(
        `${languages.alerts.requiredField.title[currentLanguage]}`,
        `${languages.alerts.requiredField.message[currentLanguage]}`,
        [{ text: "OK" }],
        { cancelable: false }
      );
      return false;
    } else {
      props.handleAddLabel(label, labelColor);
      setLabel("");
    }
  };

  const RenderColors = () => {
    return labelColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.selectColor, { backgroundColor: color }]}
          onPress={() => setLabelColor(color)}
        >
          {labelColor === color && (
            <MaterialIcons name="check" size={30} color="white" />
          )}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: labelColor }]}>
        {languages.labels.newLabel[currentLanguage]}
      </Text>

      <TextInput
        onChangeText={(text) => setLabel(text)}
        style={styles.input}
        multiline
        placeholder={languages.inputPlaceholder[currentLanguage]}
      />

      <View style={styles.selectColorContainer}>
        <RenderColors />
      </View>

      <TouchableOpacity
        style={[styles.btnAdd, { backgroundColor: labelColor }]}
        onPress={handleAdd}
      >
        <Text style={styles.btnAddText}>
          {languages.saveButton[currentLanguage]}
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
  selectColorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  selectColor: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  btnAdd: {
    height: 50,
    justifyContent: "center",
    marginTop: 20,
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
