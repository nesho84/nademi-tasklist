import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { TasksContext } from "../context/TasksContext";
import DraggableFlatList from "react-native-draggable-flatlist";
import colors from "../config/colors";
import AppModal from "./AppModal";
import TasksList from "./AppList";

export default function TasksLabel(props) {
  const [label, setLabel] = useState(null);
  const [labelModalVisible, setLabelModalVisible] = useState(false);
  // Contexts
  const { isLightTheme } = useContext(ThemeContext);
  const { tasks, orderTasks } = useContext(TasksContext);

  // Open modal to show Label with todos
  const handleLabelModal = (item) => {
    setLabel(item);
    setLabelModalVisible(true);
  };

  // Render Single Task template
  const RenderTask = ({ item, drag, isActive }) => {
    return (
      <View
        style={[
          styles.flatList,
          isLightTheme
            ? {
                backgroundColor: colors.uncheckedItem,
              }
            : {
                borderColor: colors.uncheckedItemDark,
                borderWidth: 1,
              },
          isActive && { backgroundColor: colors.muted },
        ]}
      >
        {/* -----Item title or text----- */}
        <TouchableOpacity
          style={styles.itemText}
          onPress={() => handleLabelModal(item)}
          onLongPress={drag}
        >
          <View>
            <Text
              style={[
                {
                  textDecorationLine: item.checked ? "line-through" : "none",
                },
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
              {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Show Label Modal */}
      <AppModal
        modalVisible={labelModalVisible}
        setModalVisible={setLabelModalVisible}
      >
        <TasksList label={label} />
      </AppModal>
      {/* -----Tasks Label List START----- */}
      {tasks.length > 0 ? (
        <View style={{ flex: 2 }}>
          <DraggableFlatList
            data={tasks}
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
      {/* -----Tasks Label List END----- */}
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
    padding: 10,
    borderRadius: 5,
    marginVertical: 2.5,
  },
  itemText: {
    flexShrink: 1,
    marginHorizontal: 10,
    width: "100%",
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
