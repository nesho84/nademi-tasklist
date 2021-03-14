import React, { useContext } from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import { ThemeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/routers";
import MainNavigator from "./MainNavigator";
import useAppExit from "../hooks/useAppExit";

function CustomDrawerContent(props) {
  // Custom Theme Context
  const { isLightTheme, themes } = useContext(ThemeContext);
  // confirm Exit application custom Hook
  const { exitApp } = useAppExit();

  return (
    // Drawer links or items
    <>
      {/* Navigation Header */}
      <View
        style={{
          backgroundColor: isLightTheme
            ? themes.light.background
            : themes.dark.background,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: Constants.statusBarHeight,
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.muted,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.light }}>
          Simple Tasklist
        </Text>
        <MaterialCommunityIcons
          name="arrow-left"
          type="material-community"
          color={colors.light}
          size={30}
          onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        />
      </View>

      {/* Navigation Links */}
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 10,
        }}
        {...props}
      >
        <DrawerItemList {...props} />
        <DrawerItem
          label="About"
          labelStyle={{
            color: colors.light,
            fontSize: 17,
            fontWeight: "bold",
          }}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={focused ? "information" : "information-outline"}
            />
          )}
          onPress={() => props.navigation.navigate("About")}
        />
        <DrawerItem
          label="Exit"
          labelStyle={{ color: colors.light, fontSize: 17, fontWeight: "bold" }}
          onPress={() => exitApp()}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={"exit-to-app"}
            />
          )}
        />
      </DrawerContentScrollView>
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { isLightTheme, themes } = useContext(ThemeContext);

  return (
    // Drawer Screens
    <Drawer.Navigator
      drawerContentOptions={{
        style: {
          backgroundColor: isLightTheme
            ? themes.light.background
            : themes.dark.background,
        },
        labelStyle: { color: colors.light, fontSize: 17, fontWeight: "bold" },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainNavigator}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={"home-circle-outline"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
