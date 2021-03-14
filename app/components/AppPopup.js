import React from "react";
import SimplePopupMenu from "react-native-simple-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
      onSelect={(item) => handleOnSelect(item)}
      onCancel={() => {}}
    >
      <MaterialCommunityIcons
        name="dots-vertical"
        type="material-community"
        color="#fff"
        size={30}
        style={{ marginRight: -5 }}
      />
    </SimplePopupMenu>
  );
}
