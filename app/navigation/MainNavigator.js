import React from "react";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import MainScreen from "../screens/MainScreen";
import AboutScreen from "../screens/AboutScreen";
// import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      mode="card"
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
      {/* <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      /> */}
    </Stack.Navigator>
  );
}
