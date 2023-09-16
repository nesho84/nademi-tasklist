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
import { FontAwesome } from "@expo/vector-icons";
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
    return (
      <TouchableOpacity
        onPress={() => props.handleEditModal(item)}
        onLongPress={drag}
      >
        <View
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
                { fontSize: 17 },
              ]}
            >
              {item.name}
            </Text>
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
                { fontSize: 10 },
              ]}
            >
              {item.date}
            </Text>
          </View>
          {/* -----Task delete icon----- */}
          <View>
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
              <FontAwesome name="remove" size={23} color={colors.lightMuted} />
            </TouchableOpacity>
          </View>
          {/* -----Action icons divider ----- */}
          <View style={{ marginBottom: 2.1 }}>
            <Text style={{ fontSize: 18, color: colors.lightMuted, marginHorizontal: 1 }}> | </Text>
          </View>
          {/* -----Task share icon----- */}
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => shareTask(item.name)}
            >
              <FontAwesome name="share-alt" size={22} color={colors.lightMuted} style={{ marginRight: 3 }} />
            </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 5,
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