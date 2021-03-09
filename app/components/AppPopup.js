import React from "react";
import SimplePopupMenu from "react-native-simple-popup-menu";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function AppPopup(props) {
  const navigation = useNavigation();

  const handleOnSelect = (item) => {
    navigation.navigate(item.screen, {
      itemId: item.screen,
      otherParam: item.label,
    });
  };

  return (
    <SimplePopupMenu
      items={[
        { screen: "Settings", label: "Settings", visible: true },
        // { screen: "About", label: "About", visible: true },
      ]}
      onSelect={handleOnSelect}
      onCancel={() => {}}
    >
      <Icon
        name="dots-vertical"
        type="material-community"
        color="#fff"
        size={30}
        containerStyle={{ marginRight: -1 }}
      />
    </SimplePopupMenu>
  );
}
