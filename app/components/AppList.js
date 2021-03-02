import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import colors from "../config/colors";

import DraggableFlatList from "react-native-draggable-flatlist";

export default function AppList({
  items,
  handleChecked,
  handleDelete,
  handleReorderedTasks,
  ...otherProps
}) {
  const [, setToggleCheckBox] = useState(false);

  const handleCheckbox = (newValue, itemKey) => {
    setToggleCheckBox(newValue);
    handleChecked(itemKey);
  };

  return (
    <View style={[styles.container, otherProps.style]}>
      <DraggableFlatList
        data={items}
        renderItem={({ item, index, drag, isActive }) => (
          <View
            // Items Container
            style={[
              styles.flatList,
              {
                backgroundColor:
                  isActive && !item.checked
                    ? colors.checkedItem
                    : colors.uncheckedItem,
              },
            ]}
          >
            {/* Items checkbox */}
            <View style={styles.checkboxAndTitleContainer}>
              <CheckBox
                disabled={false}
                tintColors={{
                  true: colors.successLight,
                  false: colors.light,
                }}
                value={item.checked}
                onValueChange={(newValue) => handleCheckbox(newValue, item.key)}
              />
            </View>

            {/* Item title or text */}
            <TouchableOpacity style={styles.itemText} onLongPress={drag}>
              <View>
                <Text
                  style={{
                    textDecorationLine: item.checked ? "line-through" : "none",
                    color: item.checked ? colors.checkedItemText : "white",
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Item delete icon */}
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
                        onPress: () => handleDelete(item.key),
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
        onDragEnd={({ data }) => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  flatList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 20,
    padding: 3,
    borderRadius: 5,
    marginVertical: 2,
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
});
