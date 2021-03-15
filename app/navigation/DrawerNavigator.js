import React, { useContext } from "react";
import { View, Image } from "react-native";
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
  const { isLightTheme } = useContext(ThemeContext);
  // confirm Exit application custom Hook
  const { exitApp } = useAppExit();

  return (
    <>
      {/* -----Navigation Header START----- */}
      <View
        style={{
          backgroundColor: isLightTheme
            ? colors.lightDodgerBlue
            : colors.lightDodgerBlue,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: Constants.statusBarHeight,
          minHeight: 160,
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.light,
        }}
      >
        <Image
          style={{ marginBottom: 10, width: 80, height: 80 }}
          source={require("../assets/nademi.png")}
        />
      </View>
      {/* -----Navigation Header END----- */}

      {/* -----Navigation Links START----- */}
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 10,
        }}
        {...props}
      >
        <DrawerItemList {...props} />
        {/* About Screen */}
        <DrawerItem
          label="About"
          labelStyle={{
            color: colors.light,
            fontSize: 17,
            fontWeight: "600",
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
        {/* Setting Screen */}
        <DrawerItem
          label="Settings"
          labelStyle={{
            color: colors.light,
            fontSize: 17,
            fontWeight: "600",
          }}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              color={colors.light}
              type="material-community"
              size={size}
              name={focused ? "information" : "information-outline"}
            />
          )}
          onPress={() => props.navigation.navigate("Settings")}
        />
        {/* Exit app Link */}
        <DrawerItem
          label="Exit"
          labelStyle={{ color: colors.light, fontSize: 17, fontWeight: "600" }}
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
      {/* -----Navigation Links END----- */}
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { isLightTheme, themes } = useContext(ThemeContext);

  return (
    // -----Drawer Screens (stack navigators)-----
    <Drawer.Navigator
      drawerContentOptions={{
        style: {
          backgroundColor: isLightTheme ? colors.dodgerblue : colors.dark,
        },
        labelStyle: { color: colors.light, fontSize: 17, fontWeight: "600" },
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
