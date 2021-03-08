import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { TasksContext } from "../context/TasksContext";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import DraggableFlatList from "react-native-draggable-flatlist";
import colors from "../config/colors";

export default function AppList(props) {
  // Contexts
  const { isLightTheme } = useContext(ThemeContext);
  const { tasks, checkUncheckTask, orderTasks, deleteTask } = useContext(
    TasksContext
  );

  const [_, setToggleCheckBox] = useState(false);

  const handleCheckbox = (newValue, itemKey) => {
    checkUncheckTask(itemKey);
    setToggleCheckBox(newValue);
  };

  // Filter Tasks
  let unCheckedTasks = tasks && tasks.filter((task) => task.checked === false);
  let checkedTasks = tasks && tasks.filter((task) => task.checked === true);

  return (
    <View style={styles.container}>
      {/* -----Unchecked Tasks----- */}
      {unCheckedTasks.length > 0 ? (
        <View style={{ flex: 2 }}>
          <DraggableFlatList
            data={unCheckedTasks}
            renderItem={({ item, index, drag, isActive }) => (
              <View
                style={[
                  styles.flatList1,
                  isLightTheme
                    ? { backgroundColor: colors.uncheckedItem }
                    : { borderColor: colors.uncheckedItemDark, borderWidth: 1 },
                  isActive && { backgroundColor: colors.muted },
                ]}
              >
                {/* -----Items checkbox----- */}
                <View style={styles.checkboxAndTitleContainer}>
                  <CheckBox
                    disabled={false}
                    tintColors={{
                      true: colors.successLight,
                      false: colors.light,
                    }}
                    value={item.checked}
                    onValueChange={(newValue) =>
                      handleCheckbox(newValue, item.key)
                    }
                  />
                </View>
                {/* -----Item title or text----- */}
                <TouchableOpacity
                  style={styles.itemText}
                  onPress={() => props.handleModalAction(item, "edit")}
                  onLongPress={drag}
                >
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 17,
                      }}
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
            )}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            // @TODO: save order state when drag end!
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

      {/* -----List Divider----- */}
      {checkedTasks.length > 0 && (
        <View style={styles.checkListDividerContainer}>
          <View
            style={[
              styles.listDivider,
              {
                borderColor: isLightTheme ? colors.lightSkyBlue : colors.muted,
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
      )}

      {/* -----Checked Tasks----- */}
      <View style={checkedTasks.length > 0 ? { flex: 1 } : { flex: 0 }}>
        <DraggableFlatList
          data={checkedTasks}
          renderItem={({ item, index, drag, isActive }) => (
            <View
              style={[
                styles.flatList2,
                isLightTheme
                  ? { backgroundColor: colors.checkedItem }
                  : { borderColor: colors.checkedItemDark, borderWidth: 1 },
                isActive && { backgroundColor: colors.muted },
              ]}
            >
              {/* -----Items checkbox----- */}
              <View style={styles.checkboxAndTitleContainer}>
                <CheckBox
                  disabled={false}
                  tintColors={{
                    true: colors.successLight,
                    false: colors.light,
                  }}
                  value={item.checked}
                  onValueChange={(newValue) =>
                    handleCheckbox(newValue, item.key)
                  }
                />
              </View>
              {/* -----Item title or text----- */}
              <TouchableOpacity
                style={styles.itemText}
                onPress={() => props.handleModalAction(item, "edit")}
                onLongPress={drag}
              >
                <View>
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                      color: isLightTheme
                        ? colors.checkedItemText
                        : colors.checkedItemTextDark,
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
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
          )}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => orderTasks(data)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  flatList1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 20,
    padding: 3,
    borderRadius: 5,
    marginVertical: 2.5,
  },
  flatList2: {
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
    width: "100%",
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.light,
    borderWidth: 1,
    margin: 30,
    padding: 11,
  },
  noItemsText: {
    color: colors.light,
    fontSize: 17,
    textAlign: "center",
  },
});
