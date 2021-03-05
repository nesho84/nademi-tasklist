import React, { useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { Icon } from "react-native-elements";
// Custom colos Object
import colors from "../config/colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";

function CustomDrawerContent(props) {
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
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="About"
        labelStyle={{ color: colors.light, fontSize: 17, fontWeight: "bold" }}
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
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        // activeTintColor: "#e91e63",
        style: { backgroundColor: "dodgerblue" },
        labelStyle: { color: colors.light, fontSize: 17, fontWeight: "bold" },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
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
