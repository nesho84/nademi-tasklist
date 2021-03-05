import React from "react";
import { Alert } from "react-native";
import SimplePopupMenu from "react-native-simple-popup-menu";
import { Icon } from "react-native-elements";

export default function AppPopup(props) {
  const items = [
    { screen: "clearAllTasks", label: "Delete All", visible: true },
    // { screen: "SettingsScreen", label: "Settings", visible: true },
    // { screen: "About", label: "About", visible: true },
  ];

  const handleOnSelect = (item) => {
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
      onSelect={handleOnSelect}
      onCancel={() => {}}
    >
      <Icon
        name="dots-vertical"
        type="material-community"
        color="#fff"
        size={30}
      />
    </SimplePopupMenu>
  );
}
