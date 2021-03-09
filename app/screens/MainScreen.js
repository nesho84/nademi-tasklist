import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { TasksContext } from "../context/TasksContext";
import { ThemeContext } from "../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
// Custom colos Object
import colors from "../config/colors";
// Custom Components
import AppScreen from "../components/AppScreen";
import AppNavbar from "../components/AppNavbar";
import AppLoading from "../components/AppLoading";
import AppModal from "../components/AppModal";
import TasksLabel from "../components/TasksLabel";
import TasksList from "../components/AppList";
import TaskAdd from "../components/TaskAdd";

export default function MainScreen(props) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  // Contexts
  const { isLightTheme, themes } = useContext(ThemeContext);
  const { loading, inputRef, addTask } = useContext(TasksContext);

  // Handle Add Task
  const handleAdd = (text) => {
    if (addTask(text)) {
      setAddModalVisible(false);
    }
  };

  return (
    <AppScreen>
      <AppNavbar />

      {loading ? (
        // -----Loading state-----
        <AppLoading />
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
          {/* -----Tasks List START----- */}
          <View style={styles.listContainer}>
            <TasksList />
            {/* <TasksLabel /> */}
          </View>
          {/* -----Tasks List END----- */}

          <View style={styles.divider}></View>
          <TouchableOpacity
            // Add Button
            style={[
              styles.addButtonContainer,
              {
                backgroundColor: isLightTheme
                  ? colors.successLight
                  : colors.darkGrey,
              },
            ]}
            onPress={() => setAddModalVisible(true)}
          >
            <MaterialIcons name="add-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>
        // -----Main View END-----
      )}

      {/* Add Task Modal */}
      <AppModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        inputRef={inputRef}
      >
        <TaskAdd
          handleAdd={handleAdd}
          inputRef={inputRef}
          setModalVisible={setAddModalVisible}
        />
      </AppModal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 5,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 11,
    alignItems: "center",
  },
  addButtonContainer: {
    width: "70%",
    alignItems: "center",
    borderRadius: 20,
  },
  divider: {
    width: "100%",
    borderTopColor: colors.light,
    borderTopWidth: 0.2,
    paddingBottom: 5,
  },
});
