import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TasksContext } from "../context/TasksContext";
import { ThemeContext } from "../context/ThemeContext";
// header Elements
import { Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
// Custom colos Object
import colors from "../config/colors";
// Custom Components
import AppScreen from "../components/AppScreen";
import AppList from "../components/AppList";
import AppModal from "../components/AppModal";
import AddInput from "../components/AddInput";
import EditInput from "../components/EditInput";
import AppNavbar from "../components/AppNavbar";

export default function MainScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  // Contexts
  const { isLightTheme, themes, toggleTheme } = useContext(ThemeContext);
  const { loading, inputRef, addTask, editTask } = useContext(TasksContext);

  // Open modal for add or edit Task
  const handleModalAction = (task, action) => {
    if (action === "add") {
      setModalAction("add");
    } else {
      setModalAction("edit");
      setTaskToEdit(task);
    }
    setModalVisible(true);
  };

  // Handle Add Task
  const handleAdd = (text) => {
    if (addTask(text)) {
      setModalVisible(false);
    }
  };

  // Handle Edit Task
  const handleEdit = (key, text) => {
    if (editTask(key, text)) {
      setModalVisible(false);
    }
  };

  return (
    <AppScreen>
      <AppNavbar />

      {/* -----Loading state START----- */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingContainerText}>Loading...</Text>
        </View>
      ) : (
        // -----Main View START-----
        <View
          style={[
            styles.container,
            {
              backgroundColor: isLightTheme
                ? themes.light.background
                : themes.dark.background,
            },
          ]}
        >
          <AppModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            inputRef={inputRef}
          >
            {modalAction === "add" ? (
              <AddInput
                handleAdd={handleAdd}
                inputRef={inputRef}
                setModalVisible={setModalVisible}
              />
            ) : (
              <EditInput
                taskToEdit={taskToEdit}
                handleEdit={handleEdit}
                inputRef={inputRef}
                setModalVisible={setModalVisible}
              />
            )}
          </AppModal>

          {/* -----Tasks List START----- */}
          <View style={styles.listContainer}>
            <AppList handleModalAction={handleModalAction} />
          </View>
          {/* -----Tasks List END----- */}

          <Divider style={styles.nativeDivider} />

          <TouchableOpacity
            // Add Button
            style={styles.addButtonContainer}
            onPress={() => handleModalAction(null, "add")}
          >
            <View style={styles.addButton}>
              <MaterialIcons name="add-circle" size={45} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        // -----Main View END-----
      )}
      {/* -----Loading state END----- */}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainerText: {
    color: "dodgerblue",
    fontSize: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "dodgerblue",
    paddingTop: 10,
    paddingBottom: 5,
  },
  addButtonContainer: {
    width: "70%",
    // marginTop: 5,
    alignItems: "center",
    backgroundColor: colors.successLight,
    borderRadius: 20,
  },
  listContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
  },
  nativeDivider: {
    width: "100%",
    height: 0.2,
    backgroundColor: colors.light,
    marginVertical: 5,
  },
});
