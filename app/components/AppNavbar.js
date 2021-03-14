import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Header, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AppPopup from "./AppPopup";

export default function AppNavbar() {
  // Contexts
  const { isLightTheme, themes } = useContext(ThemeContext);

  const navigation = useNavigation();

  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="menu"
            type="material-community"
            color="#fff"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        }
        centerComponent={{
          text: "Simple TaskList",
          style: styles.title,
        }}
        rightComponent={<AppPopup />}
        containerStyle={{
          backgroundColor: isLightTheme
            ? themes.light.background
            : themes.dark.background,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
