import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Share,
} from "react-native";
import Checkbox from "expo-checkbox";
import DraggableFlatList from "react-native-draggable-flatlist";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import TasksDivider from "./TasksDivider";
import AppNoItems from "../AppNoItems";
import colors from "../../config/colors";
import { ThemeContext } from "../../context/ThemeContext";

export default function TasksList(props) {
  const { theme } = useContext(ThemeContext);

  const lastUnchecked = props.unCheckedTasks[props.unCheckedTasks.length - 1];
  const lastChecked = props.checkedTasks[props.checkedTasks.length - 1];

  const shareTask = (text) => {
    Share.share({
      message: text.toString(),
    })
      //after successful share return result
      .then((result) => console.log())
      .catch((err) => console.log(err))
  };

  // Single Task template
  const RenderTask = ({ item, index, drag, isActive }) => {

    // Task Reminder active logic
    const itemDateTime = item.reminder?.dateTime ?? null;
    const hasActiveReminder = () => {
      const currentDateTime = new Date();
      const reminderDateTime = new Date(itemDateTime);
      const timeDifferenceInSeconds = Math.max(0, (reminderDateTime - currentDateTime) / 1000);
      if (itemDateTime && timeDifferenceInSeconds > 0) {
        return true;
      } else {
        return false;
      }
    }

    return (
      <TouchableOpacity
        onPress={() => props.handleEditModal(item)}
        onLongPress={drag}
        style={[
          styles.tasksListContainer,
          theme.current === "light"
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

        {/* Top Section */}
        <View style={styles.tasksListContainerTop}>
          {/* -----Task checkbox----- */}
          <View style={styles.checkboxAndTitleContainer}>
            <Checkbox
              color={
                item.checked
                  ? theme.current === "light"
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
                theme.current === "light"
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
                { fontSize: 15 },
              ]}
            >
              {item.name}
            </Text>

          </View>
          {/* -----Delete icon----- */}
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                `${props.lang.languages.alerts.deleteTask.title[
                props.lang.current
                ]
                }`,
                `${props.lang.languages.alerts.deleteTask.message[
                props.lang.current
                ]
                }`,
                [
                  {
                    text: `${props.lang.languages.alerts.yes[props.lang.current]
                      }`,
                    onPress: () => props.handleDeleteTask(item.key),
                  },
                  {
                    text: `${props.lang.languages.alerts.no[props.lang.current]
                      }`,
                  },
                ],
                { cancelable: false }
              )
            }
          >
            <Ionicons name="close" size={24} color={colors.lightMuted} style={{ marginRight: 3 }} />
          </TouchableOpacity>
        </View>

        {/* Bottom Section */}
        <View style={styles.tasksListContainerBottom}>
          {/* -----Reminder icon----- */}
          <Ionicons
            name={hasActiveReminder() ? "notifications" : "notifications-off"}
            size={16}
            color={hasActiveReminder() ? colors.success : colors.darkGrey}
            style={{ marginRight: 7 }}
          />
          {/* -----Share icon----- */}
          <TouchableOpacity activeOpacity={0.7} onPress={() => shareTask(item.name)}>
            <Ionicons name="md-share-social" size={16} color={colors.darkGrey} style={{ marginLeft: 17 }} />
          </TouchableOpacity>
          {/* -----Task dateTime----- */}
          <Text
            style={[
              theme.current === "light"
                ? {
                  color: item.checked
                    ? colors.checkedItemText
                    : colors.light,
                }
                : {
                  color: item.checked
                    ? colors.darkGrey
                    : colors.darkGrey,
                },
              { fontSize: 11 },
            ]}
          >
            {item.date}
          </Text>
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
                <View style={{ marginBottom: lastUnchecked === item ? 3 : 0 }}>
                  <RenderTask
                    item={item}
                    index={index}
                    drag={drag}
                    isActive={isActive}
                  />
                </View>
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

      {/* -----Checked Tasks START----- */}
      {props.checkedTasks.length > 0 && (
        <>
          {/* -----Tasks Divider----- */}
          <TasksDivider
            checkedTasks={props.checkedTasks.length}
            lang={props.lang}
          />
          <TouchableWithoutFeedback>
            <View style={{ flex: 1 }}>
              <DraggableFlatList
                data={props.checkedTasks}
                renderItem={({ item, index, drag, isActive }) => (
                  <View style={{ marginBottom: lastChecked === item ? 6 : 0 }}>
                    <RenderTask
                      item={item}
                      index={index}
                      drag={drag}
                      isActive={isActive}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                onDragEnd={({ data }) => props.handleOrderTasks(data)}
              />
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
      {/* -----Checked Tasks END----- */}
    </>
  );
}

const styles = StyleSheet.create({
  tasksListContainer: {
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 5
  },
  tasksListContainerTop: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  tasksListContainerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#394046",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  itemText: {
    width: "100%",
    marginLeft: 10,
    marginRight: 8,
    flexShrink: 1,
  },
  checkboxAndTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -3,
    flexShrink: 1,
  },
});