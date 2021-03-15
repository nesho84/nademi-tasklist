import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import colors from "../../config/colors";
import AppBox from "../AppBox";

export default function LabelsList({
  labels,
  orderLabels,
  isLightTheme,
  handleEditModal,
}) {
  const navigation = useNavigation();

  // Render Single Task template
  const RenderLabel = ({ item, index, drag, isActive }) => {
    const checkedTasksCount = item.tasks.filter((task) => task.checked).length;
    const unCheckedTasksCount = item.tasks.length - checkedTasksCount;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Label-Details", { labelKey: item.key })
        }
        onLongPress={drag}
      >
        <View
          style={[
            styles.labelBox,
            {
              backgroundColor: item.color,
              borderColor: colors.muted,
              borderWidth: 1,
            },
            isActive && { backgroundColor: colors.muted },
          ]}
        >
          {/* -----Item title and edit icon Container----- */}
          <View
            style={[
              styles.labelBoxTitleContainer,
              {
                backgroundColor: isLightTheme ? colors.dodgerblue : colors.dark,
              },
            ]}
          >
            <Text style={styles.labelBoxTitle}>{item.title}</Text>
            {/* EditLabel Icon */}
            <MaterialCommunityIcons
              name="playlist-edit"
              size={25}
              color={colors.light}
              onPress={() => handleEditModal(item)}
            />
          </View>

          <View
            style={{
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{unCheckedTasksCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{checkedTasksCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* -----Tasks Label List START----- */}
      {labels.length > 0 ? (
        <DraggableFlatList
          containerStyle={styles.draggableFlatListContainer}
          data={labels}
          renderItem={({ item, index, drag, isActive }) => (
            <RenderLabel
              item={item}
              index={index}
              drag={drag}
              isActive={isActive}
            />
          )}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => orderLabels(data)}
        />
      ) : (
        // -----No Labels to show-----
        <AppBox isLightTheme={isLightTheme} />
      )}
      {/* -----Tasks Label List END----- */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  draggableFlatListContainer: {
    paddingHorizontal: 5,
    paddingTop: 7,
  },
  labelBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
  },
  labelBoxTitleContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 2,
    marginBottom: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  labelBoxTitle: {
    flexShrink: 1,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: "600",
    color: colors.light,
  },
  count: {
    fontSize: 24,
    color: colors.light,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.light,
  },
});
