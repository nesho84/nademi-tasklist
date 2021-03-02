import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppModal({
  children,
  modalVisible,
  setModalVisible,
  inputRef,
}) {
  return (
    <Modal
      onShow={() => inputRef.current.focus()}
      animationType="slide"
      visible={modalVisible}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalContainer}>
          <MaterialIcons
            style={styles.closeIcon}
            name="close"
            size={45}
            color="#A93238"
            onPress={() => setModalVisible(false)}
          />
          {children}
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
    backgroundColor: "#F3F3F3",
  },
  closeIcon: {
    position: "absolute",
    top: 25,
    right: 25,
  },
});
