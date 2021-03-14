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

export default function AddLabel(props) {
  const bgColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];

  const [label, setLabel] = useState("");
  const [labelColor, setLabelColor] = useState(bgColors[0]);

  const handleAdd = () => {
    if (label.length < 1) {
      Alert.alert(
        "Required field",
        "Please insert at least one or more charachters.",
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
    return bgColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.selectColor, { backgroundColor: color }]}
          onPress={() => setLabelColor(color)}
        ></TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: labelColor }]}>
        Create New Label
      </Text>

      <TextInput
        onChangeText={(text) => setLabel(text)}
        style={styles.input}
        multiline
        placeholder="Enter text..."
      />

      <View style={styles.selectColorContainer}>
        <RenderColors />
      </View>

      <TouchableOpacity
        style={[styles.btnAdd, { backgroundColor: labelColor }]}
        onPress={handleAdd}
      >
        <Text style={styles.btnAddText}>SAVE</Text>
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
