import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import colors from "../config/colors";

export default function AppList({
  items,
  handleChecked,
  handleDelete,
  ...otherProps
}) {
  const [, setToggleCheckBox] = useState(false);

  const handleCheckbox = (newValue, itemKey) => {
    setToggleCheckBox(newValue);
    handleChecked(itemKey);
  };

  return (
    <View style={[styles.container, otherProps.style]}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          // Items Container
          <View
            style={[
              styles.itemTitle,
              {
                backgroundColor: item.checked
                  ? colors.checkedItem
                  : colors.uncheckedItem,
              },
            ]}
          >
            {/* Items checkbox */}
            <View style={styles.checkboxContainer}>
              <CheckBox
                disabled={false}
                tintColors={{
                  true: colors.successLight,
                  false: colors.light,
                }}
                value={item.checked}
                onValueChange={(newValue) => handleCheckbox(newValue, item.key)}
              />
              {/* Item title or text */}
              <View style={{ flexShrink: 1, marginHorizontal: 10 }}>
                <Text
                  style={{
                    textDecorationLine: item.checked ? "line-through" : "none",
                    color: item.checked ? colors.checkedItemText : "white",
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                  onPress={() => handleChecked(item.key)}
                >
                  {item.name}
                </Text>
              </View>
            </View>

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  itemTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});
