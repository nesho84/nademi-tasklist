import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";

export default function AddLabelButton(props) {
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themes.addLabelButton.container[currentTheme],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: themes.addLabelButton.addButton[currentTheme],
          },
        ]}
        onPress={() => props.setModalVisible(true)}
      >
        <MaterialIcons name="add-circle" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderTopColor: "#616161",
    borderTopWidth: 1,
  },
  addButton: {
    width: "75%",
    alignItems: "center",
    borderRadius: 20,
  },
});
