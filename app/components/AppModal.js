import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../config/colors";
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppModal(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal
      onShow={() => (props.inputRef ? props.inputRef.current.focus() : {})}
      onRequestClose={() => props.setModalVisible(false)}
      animationType="slide"
      visible={props.modalVisible}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor:
                theme.themes.appModal.modalContainer[theme.current],
            },
          ]}
        >
          <MaterialIcons
            style={styles.closeIcon}
            name="close"
            size={35}
            color={colors.light}
            onPress={() => props.setModalVisible(false)}
          />
          {props.children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
});
