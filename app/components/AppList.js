import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { TasksContext } from "../context/TasksContext";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import DraggableFlatList from "react-native-draggable-flatlist";
import colors from "../config/colors";
import AppModal from "./AppModal";
import TaskEdit from "./TaskEdit";

export default function AppList(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Contexts
  const { isLightTheme } = useContext(ThemeContext);
  const {
    tasks,
    checkUncheckTask,
    orderTasks,
    editTask,
    inputRef,
    deleteTask,
  } = useContext(TasksContext);

  // Filter Tasks
  let unCheckedTasks = tasks && tasks.filter((task) => task.checked === false);
  let checkedTasks = tasks && tasks.filter((task) => task.checked === true);

  // Toggle task checkbox
  const handleCheckbox = (newValue, itemKey) => {
    checkUncheckTask(itemKey);
    setToggleCheckBox(newValue);
  };

  // Edit Task in Storage
  const handleEdit = (key, text) => {
    if (editTask(key, text)) {
      setEditModalVisible(false);
    }
  };

  // Open modal for editing Task
  const handleEditModal = (task) => {
    setTaskToEdit(task);
    setEditModalVisible(true);
  };

  // Single Task template
  const RenderTask = ({ item, drag, isActive, listStyle }) => {
    return (
      <View
        style={[
          styles.flatList,
          isLightTheme
            ? {
                backgroundColor: item.checked
                  ? colors.checkedItem
                  : colors.uncheckedItem,
              }
            : {
                borderColor: item.checked
                  ? colors.checkedItemDark
                  : colors.uncheckedItemDark,
                borderWidth: 1,
              },
          isActive && { backgroundColor: colors.muted },
        ]}
      >
        {/* -----Items checkbox----- */}
        <View style={styles.checkboxAndTitleContainer}>
          <CheckBox
            disabled={false}
            tintColors={{
              true: isLightTheme ? colors.successLight : colors.darkGrey,
              false: colors.light,
            }}
            value={item.checked}
            onValueChange={(newValue) => handleCheckbox(newValue, item.key)}
          />
        </View>
        {/* -----Item title or text----- */}
        <TouchableOpacity
          style={styles.itemText}
          onPress={() => handleEditModal(item)}
          onLongPress={drag}
        >
          <View>
            <Text
              style={[
                { textDecorationLine: item.checked ? "line-through" : "none" },
                isLightTheme
                  ? {
                      color: item.checked
                        ? colors.checkedItemText
                        : colors.light,
                    }
                  : {
                      color: item.checked
                        ? colors.checkedItemTextDark
                        : colors.light,
                    },
                { fontSize: 16 },
              ]}
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
        {/* -----Item delete icon----- */}
        <View>
          <MaterialIcons
            name="delete"
            size={23}
            color="white"
            onPress={() =>
              Alert.alert(
                "Delete",
                "Are you sure?",
                [
                  {
                    text: "Yes",
                    onPress: () => deleteTask(item.key),
                  },
                  {
                    text: "No",
                  },
                ],
                { cancelable: false }
              )
            }
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* -----Unchecked Tasks START----- */}
      {unCheckedTasks.length > 0 ? (
        <View style={{ flex: 2 }}>
          <DraggableFlatList
            data={unCheckedTasks}
            renderItem={({ item, index, drag, isActive }) => (
              // Single task template
              <RenderTask item={item} drag={drag} isActive={isActive} />
            )}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => orderTasks(data)}
          />
        </View>
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>
            No Tasks to show.{"\n\n"}
            <Text>You can use the plus button (+) to create new tasks.</Text>
          </Text>
        </View>
      )}
      {/* -----Unchecked Tasks END----- */}

      {/* -----List Divider START----- */}
      {checkedTasks.length > 0 && (
        <>
          <View style={styles.checkListDividerContainer}>
            <View
              style={[
                styles.listDivider,
                {
                  borderColor: isLightTheme
                    ? colors.lightSkyBlue
                    : colors.muted,
                },
              ]}
            ></View>
            <Text
              style={[
                styles.listDividerText,
                { color: isLightTheme ? colors.checkedItemText : colors.muted },
              ]}
            >
              {checkedTasks.length} Checked Items
            </Text>
          </View>
          {/* -----List Divider END----- */}

          {/* -----Checked Tasks START----- */}
          <View style={checkedTasks.length > 0 ? { flex: 1 } : { flex: 0 }}>
            <DraggableFlatList
              data={checkedTasks}
              renderItem={({ item, index, drag, isActive }) => (
                // Single task template
                <RenderTask item={item} drag={drag} isActive={isActive} />
              )}
              keyExtractor={(item, index) => `draggable-item-${item.key}`}
              onDragEnd={({ data }) => orderTasks(data)}
            />
          </View>
          {/* -----Checked Tasks END----- */}
        </>
      )}

      {/* -----Edit Task Modal----- */}
      <AppModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        inputRef={inputRef}
      >
        <TaskEdit
          taskToEdit={taskToEdit}
          handleEdit={handleEdit}
          inputRef={inputRef}
          setModalVisible={setEditModalVisible}
        />
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  flatList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 20,
    padding: 3,
    borderRadius: 5,
    marginVertical: 2.5,
  },
  itemText: {
    flexShrink: 1,
    marginHorizontal: 10,
    width: "100%",
  },
  checkboxAndTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  checkListDividerContainer: {
    marginTop: 7,
    marginBottom: 3,
  },
  listDivider: {
    width: "100%",
    borderWidth: 1,
    marginBottom: 1,
  },
  listDividerText: {
    fontSize: 13,
  },
  noItemsContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.light,
    borderWidth: 1,
    margin: 30,
    padding: 30,
  },
  noItemsText: {
    color: colors.light,
    fontSize: 17,
    textAlign: "center",
  },
});
