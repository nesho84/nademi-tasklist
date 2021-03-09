import React, { useEffect, useContext } from "react";
import { BackHandler, Alert, Text, View } from "react-native";
import Constants from "expo-constants";
import { ThemeContext } from "../context/ThemeContext";
import { Icon } from "react-native-elements";
import colors from "../config/colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/routers";
import MainNavigator from "./MainNavigator";

function CustomDrawerContent(props) {
  const { isLightTheme, themes } = useContext(ThemeContext);

  // confirm Exit application
  const exitApp = () => {
    Alert.alert("Hold on!", "Are you sure you want to go exit?", [
      { text: "Yes", onPress: () => BackHandler.exitApp() },
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
    ]);
    return true;
  };

  useEffect(() => {
    // Exit app Handler
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      exitApp
    );
    return () => backHandler.remove();
  }, []);

  // Drawer links or items
  return (
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
        <Icon
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
            <Icon
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
            <Icon
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
            <Icon
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
