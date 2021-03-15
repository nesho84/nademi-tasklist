import React, { useContext, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Keyboard, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { TasksContext } from "../context/TasksContext";
import colors from "../config/colors";
import AppScreen from "../components/AppScreen";
import AppModal from "../components/AppModal";
import EditTask from "../components/tasks/EditTask";
import TasksList from "../components/tasks/TasksList";
import AddTask from "../components/tasks/AddTask";

export default function LabelDetails({ route, navigation }) {
  // Contexts
  const { isLightTheme } = useContext(ThemeContext);
  const {
    labels,
    deleteLabel,
    addTask,
    editTask,
    deleteTask,
    checkUncheckTask,
    orderTasks,
    inputRef,
  } = useContext(TasksContext);

  // Get the current Label
  const currentLabel = labels.find(
    (label) => label.key === route.params.labelKey
  );

  // Filter Tasks unchecked and checked
  const unCheckedTasks =
    currentLabel && currentLabel.tasks
      ? currentLabel.tasks.filter((task) => task.checked === false)
      : [];
  const checkedTasks =
    currentLabel && currentLabel.tasks
      ? currentLabel.tasks.filter((task) => task.checked === true)
      : [];

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Add Task to Storage
  const handleAddTask = (text) => {
    addTask(currentLabel.key, text);
    inputRef.current.clear();
    Keyboard.dismiss();
  };

  // Open modal for editing Task
  const handleEditModal = (item) => {
    setTaskToEdit(item);
    setEditModalVisible(true);
  };

  // Edit Task in Storage
  const handleEditTask = (taskKey, input) => {
    editTask(taskKey, input);
    setEditModalVisible(false);
  };

  // Delete task from the Storage
  const handleDeleteTask = (taskKey) => {
    deleteTask(taskKey);
  };

  // Delete the entire label from the Storage
  const handleDeleteLabel = (labelKey) => {
    Alert.alert(
      "Delete Label and all of its tasks!",
      "Are you sure?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteLabel(labelKey);
            navigation.goBack();
          },
        },
        {
          text: "No",
        },
      ],
      { cancelable: false }
    );
  };

  // Toggle task to checked or unchecked
  const handleCheckbox = (newValue, itemKey) => {
    checkUncheckTask(itemKey);
    setToggleCheckBox(newValue);
  };

  // Order Tasks
  const handleOrderTasks = (orderedTasks) => {
    orderTasks(currentLabel.key, orderedTasks);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="filter-variant-remove"
          size={25}
          color={colors.light}
          style={{ marginRight: 15 }}
          onPress={() => handleDeleteLabel(currentLabel.key)}
        />
      ),
    });
  }, [navigation]);

  return (
    <AppScreen>
      {currentLabel && (
        <View style={styles.container}>
          {/* Label and Header Title */}
          <View
            style={[
              styles.headerTitle,
              { borderBottomColor: currentLabel.color },
            ]}
          >
            {/* Header Title */}
            <Text
              style={{
                fontSize: 30,
                // color: isLightTheme ? colors.dark : colors.light,
                color: currentLabel.color,
                paddingHorizontal: 10,
              }}
            >
              {currentLabel.title}
            </Text>
            {/* Header subtitle */}
            <Text
              style={{
                fontSize: 14,
                color: colors.muted,
                paddingHorizontal: 10,
              }}
            >
              {`${checkedTasks.length} of ${
                currentLabel.tasks ? currentLabel.tasks.length : "0"
              } tasks`}
            </Text>
          </View>

          {/* -----Tasks List----- */}
          <TasksList
            isLightTheme={isLightTheme}
            unCheckedTasks={unCheckedTasks}
            checkedTasks={checkedTasks}
            handleEditModal={handleEditModal}
            handleCheckbox={handleCheckbox}
            handleOrderTasks={handleOrderTasks}
            handleDeleteTask={handleDeleteTask}
          />

          {/* -----Edit Task Modal----- */}
          <AppModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
          >
            <EditTask
              labels={labels}
              taskToEdit={taskToEdit}
              handleEditTask={handleEditTask}
              setModalVisible={setEditModalVisible}
            />
          </AppModal>

          {/* Add Task Input */}
          <AddTask
            inputRef={inputRef}
            handleAddTask={handleAddTask}
            currentLabelColor={currentLabel.color}
          />
        </View>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headerTitle: {
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    alignSelf: "stretch",
  },
});
