import React from "react";
import { StyleSheet, View, StatusBar, Alert } from "react-native";
import SimplePopupMenu from "react-native-simple-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppPopup(props) {
  const items = [
    { screen: "clearAllTasks", label: "Delete All", visible: true },
    // { screen: "SettingsScreen", label: "Settings", visible: true },
    { screen: "AboutScreen", label: "About", visible: true },
    { screen: "exitApp", label: "Exit", visible: true },
  ];

  const handleOnSelect = (item) => {
    // console.log(item.screen);
    if (item.screen === "clearAllTasks") {
      if (props.itemsList.length === 0) {
        Alert.alert(
          "",
          "Nothing to delete.",
          [
            {
              text: "OK",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
        return;
      }

      Alert.alert(
        "Delete all items in the Storage!",
        "Are you sure?",
        [
          {
            text: "Yes",
            onPress: () => props.clearAllTasks(),
          },
          {
            text: "No",
          },
        ],
        { cancelable: false }
      );
    } else if (item.screen === "exitApp") {
      props.exitApp();
    } else {
      props.navigation.navigate(item.screen, {
        itemId: item.screen,
        otherParam: item.label,
      });
    }
  };

  return (
    <SimplePopupMenu
      items={items}
      style={styles.popupMenuContainer}
      onSelect={handleOnSelect}
      onCancel={() => {}}
    >
      <MaterialCommunityIcons name="dots-vertical" size={34} color="white" />
    </SimplePopupMenu>
  );
}

const styles = StyleSheet.create({
  button: {},
  popupMenuContainer: {
    paddingTop: 15,
    position: "absolute",
    top: StatusBar.currentHeight || 0,
    right: 10,
  },
});
