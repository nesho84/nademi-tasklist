import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import colors from "../config/colors";

export default function AppList({ items, handleChecked, handleDelete }) {
  const [, setToggleCheckBox] = useState(false);

  const handleCheckbox = (newValue, itemKey) => {
    setToggleCheckBox(newValue);
    handleChecked(itemKey);
  };

  // console.log(items.length > 0 ? "some items" : "no items");

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
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
                  onValueChange={(newValue) =>
                    handleCheckbox(newValue, item.key)
                  }
                />
                {/* Item title or text */}
                <View style={{ flexShrink: 1, marginHorizontal: 10 }}>
                  <Text
                    style={{
                      textDecorationLine: item.checked
                        ? "line-through"
                        : "none",
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
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>
            No Items to show.{"\n\n"}
            <Text>You can use the plus button (+) to create new tasks.</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    // justifyContent: "space-between",
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
  noItemsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.uncheckedItem,
    borderWidth: 1,
    margin: 30,
    padding: 10,
  },
  noItemsText: { color: colors.light, fontSize: 17, textAlign: "center" },
});
