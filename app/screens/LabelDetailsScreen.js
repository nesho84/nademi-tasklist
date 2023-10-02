import React, { useContext, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LanguageContext } from "../context/LanguageContext";
import { TasksContext } from "../context/TasksContext";
import colors from "../config/colors";
import AppScreen from "../components/AppScreen";
import AppModal from "../components/AppModal";
import EditTask from "../components/tasks/EditTask";
import TasksList from "../components/tasks/TasksList";
import AddTask from "../components/tasks/AddTask";

export default function LabelDetailsScreen({ route, navigation }) {
  const { lang } = useContext(LanguageContext);

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
  const filterTasks = (isChecked) => {
    return currentLabel && currentLabel.tasks
      ? currentLabel.tasks.filter((task) => task.checked === isChecked)
      : [];
  };

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
  const handleEditTask = (taskObj) => {
    editTask(taskObj);
    setEditModalVisible(false);
  };

  // Delete task from the Storage
  const handleDeleteTask = (taskKey) => {
    deleteTask(taskKey);
  };

  // Delete the entire label from the Storage
  const handleDeleteLabel = (labelKey) => {
    Alert.alert(
      `${lang.languages.alerts.deleteLabel.title[lang.current]}`,
      `${lang.languages.alerts.deleteLabel.message[lang.current]}`,
      [
        {
          text: `${lang.languages.alerts.yes[lang.current]}`,
          onPress: () => {
            deleteLabel(labelKey);
            navigation.goBack();
          },
        },
        {
          text: `${lang.languages.alerts.no[lang.current]}`,
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

  // Accessing Native navigation bar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          // console.log(currentLabel);
          handleDeleteLabel(currentLabel.key);
        }}>
          <MaterialCommunityIcons
            name="delete-alert-outline"
            size={24}
            color={colors.danger}
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentLabel]);

  return (
    <AppScreen>
      {currentLabel && (
        <View style={styles.container}>
          {/* Header container */}
          <View
            style={[
              styles.headerContainer,
              { borderBottomColor: currentLabel.color },
            ]}
          >
            {/* Header Title */}
            <Text
              style={{
                fontSize: 22,
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
              {`${filterTasks(true).length} ${lang.languages.labels.of[lang.current]
                } ${currentLabel.tasks ? currentLabel.tasks.length : "0"} ${lang.languages.labels.tasks[lang.current]
                }`}
            </Text>
          </View>

          {/* -----Tasks List----- */}
          <TasksList
            unCheckedTasks={filterTasks(false)}
            checkedTasks={filterTasks(true)}
            handleEditModal={handleEditModal}
            handleCheckbox={handleCheckbox}
            handleOrderTasks={handleOrderTasks}
            handleDeleteTask={handleDeleteTask}
            lang={lang}
          />

          {/* Add Task Input */}
          <AddTask
            inputRef={inputRef}
            handleAddTask={handleAddTask}
            currentLabelColor={currentLabel.color}
            placeholder={lang.languages.inputPlaceholder[lang.current]}
            lang={lang}
          />

          {/* -----Edit Task Modal----- */}
          <AppModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
          >
            <EditTask
              taskToEdit={taskToEdit}
              handleEditTask={handleEditTask}
              lang={lang}
            />
          </AppModal>
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
  headerContainer: {
    paddingTop: 1,
    paddingBottom: 5,
    borderBottomWidth: 1,
    alignSelf: "stretch",
  },
});