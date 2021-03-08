import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import MainScreen from "../screens/MainScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  // Contexts
  const { isLightTheme, themes } = useContext(ThemeContext);

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
          headerStyle: {
            backgroundColor: isLightTheme
              ? themes.light.background
              : themes.dark.background,
          },
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: isLightTheme
              ? themes.light.background
              : themes.dark.background,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
    </Stack.Navigator>
  );
}
