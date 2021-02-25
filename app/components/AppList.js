import React from "react";

import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppList({ items, handleChecked, handleDelete }) {
  return (
    <View style={styles.listContainer}>
      {items && (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemTitle,
                { backgroundColor: item.checked ? "#3C85CC" : "#4BA6FF" },
              ]}
            >
              <View>
                <Text
                  style={{
                    textDecorationLine: item.checked ? "line-through" : "none",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                  onPress={() => handleChecked(item.key)}
                >
                  {item.name}
                </Text>
              </View>
              <View>
                <MaterialIcons
                  name="delete"
                  size={22}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 20,
    padding: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  listContainer: {
    marginTop: 25,
    width: "80%",
    flex: 1,
  },
});
