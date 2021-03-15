import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import colors from "../../config/colors";
import CheckBox from "@react-native-community/checkbox";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialIcons } from "@expo/vector-icons";
import TasksDivider from "./TasksDivider";
import AppBox from "../AppBox";

export default function TasksList(props) {
  // Single Task template
  const RenderTask = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        onPress={() => props.handleEditModal(item)}
        onLongPress={drag}
      >
        <View
          style={[
            styles.tasksListContainer,
            props.isLightTheme
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
          {/* -----Task checkbox----- */}
          <View style={styles.checkboxAndTitleContainer}>
            <CheckBox
              disabled={false}
              tintColors={{
                true: props.isLightTheme
                  ? colors.successLight
                  : colors.darkGrey,
                false: colors.light,
              }}
              value={item.checked}
              onValueChange={(newValue) =>
                props.handleCheckbox(newValue, item.key)
              }
            />
          </View>
          {/* -----Task text----- */}
          <View style={styles.itemText}>
            <Text
              style={[
                {
                  textDecorationLine: item.checked ? "line-through" : "none",
                },
                props.isLightTheme
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
                { fontSize: 17 },
              ]}
            >
              {item.name}
            </Text>
          </View>
          {/* -----Task delete icon----- */}
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
                      onPress: () => props.handleDeleteTask(item.key),
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
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* -----Unchecked Tasks START----- */}
      {props.unCheckedTasks.length > 0 ? (
        <TouchableWithoutFeedback>
          <View style={{ flex: 2 }}>
            <DraggableFlatList
              data={props.unCheckedTasks}
              renderItem={({ item, index, drag, isActive }) => (
                <RenderTask
                  item={item}
                  index={index}
                  drag={drag}
                  isActive={isActive}
                />
              )}
              keyExtractor={(item, index) => `draggable-item-${item.key}`}
              onDragEnd={({ data }) => props.handleOrderTasks(data)}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        // -----No Tasks to show-----
        <AppBox isLightTheme={props.isLightTheme} />
      )}
      {/* -----Unchecked Tasks END----- */}

      {props.checkedTasks.length > 0 && (
        <>
          {/* -----Tasks Divider----- */}
          <TasksDivider
            checkedTaks={props.checkedTasks.length}
            isLightTheme={props.isLightTheme}
          />

          {/* -----Checked Tasks START----- */}
          <TouchableWithoutFeedback
            style={props.checkedTasks.length > 0 ? { flex: 1 } : { flex: 0 }}
          >
            <DraggableFlatList
              data={props.checkedTasks}
              renderItem={({ item, index, drag, isActive }) => (
                <RenderTask
                  item={item}
                  index={index}
                  drag={drag}
                  isActive={isActive}
                />
              )}
              keyExtractor={(item, index) => `draggable-item-${item.key}`}
              onDragEnd={({ data }) => props.handleOrderTasks(data)}
            />
          </TouchableWithoutFeedback>
          {/* -----Checked Tasks END----- */}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tasksListContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    marginVertical: 3,
    marginHorizontal: 8,
  },
  itemText: {
    width: "100%",
    marginHorizontal: 10,
    flexShrink: 1,
  },
  checkboxAndTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
});
