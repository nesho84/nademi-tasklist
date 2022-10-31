import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import colors from "../../config/colors";
import AppNoItems from "../AppNoItems";

export default function LabelsList({
  labels,
  orderLabels,
  handleEditModal,
  lang,
}) {
  const navigation = useNavigation();

  const lastItem = labels[labels.length - 1];

  // Render Single Label template
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
            { backgroundColor: isActive ? colors.muted : item.color },
            { marginBottom: lastItem === item ? 6 : 0 },
          ]}
        >
          {/* -----Item title and edit icon Container----- */}
          <View style={styles.labelBoxHeaderContainer}>
            <View style={styles.iconBeforeTitle}>
              <MaterialCommunityIcons
                style={{ marginRight: 5 }}
                name="label-outline"
                size={26}
                color={colors.light}
                onPress={() => {}}
              />
              <Text style={styles.labelBoxTitle}>{item.title}</Text>
            </View>
            {/* EditLabel Icon */}
            <TouchableOpacity onPress={() => handleEditModal(item)}>
              <MaterialCommunityIcons
                style={{ marginRight: -1 }}
                name="playlist-edit"
                size={31}
                color={colors.light}
              />
            </TouchableOpacity>
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
              <Text style={styles.subtitle}>
                {lang.languages.labels.remaining[lang.current]}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{checkedTasksCount}</Text>
              <Text style={styles.subtitle}>
                {lang.languages.labels.completed[lang.current]}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* -----Label List START----- */}
      {labels && labels.length > 0 ? (
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
        <AppNoItems />
      )}
      {/* -----Label List END----- */}
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
  },
  labelBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    borderRadius: 5,
    borderColor: colors.lightMuted,
    borderWidth: 0.3,
    elevation: 2,
    marginTop: 6,
  },
  labelBoxHeaderContainer: {
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
  iconBeforeTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelBoxTitle: {
    flexShrink: 1,
    paddingVertical: 5,
    color: colors.light,
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 1,
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
