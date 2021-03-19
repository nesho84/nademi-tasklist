import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialIcons } from "@expo/vector-icons";
import TasksDivider from "./TasksDivider";
import AppNoItems from "../AppNoItems";
import colors from "../../config/colors";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";

export default function TasksList(props) {
  // Contexts
  const { themes, currentTheme } = useContext(ThemeContext);
  const { languages, currentLanguage } = useContext(LanguageContext);

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
            currentTheme === "light"
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
            <Checkbox
              color={
                item.checked
                  ? currentTheme === "light"
                    ? colors.successLight
                    : colors.darkGrey
                  : colors.light
              }
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
                currentTheme === "light"
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
                  `${languages.alerts.deleteTask.title[currentLanguage]}`,
                  `${languages.alerts.deleteTask.message[currentLanguage]}`,
                  [
                    {
                      text: `${languages.alerts.yes[currentLanguage]}`,
                      onPress: () => props.handleDeleteTask(item.key),
                    },
                    {
                      text: `${languages.alerts.no[currentLanguage]}`,
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
        <AppNoItems />
      )}
      {/* -----Unchecked Tasks END----- */}

      {props.checkedTasks.length > 0 && (
        <>
          {/* -----Tasks Divider----- */}
          <TasksDivider checkedTasks={props.checkedTasks.length} />

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
