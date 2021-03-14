import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import LabelsScreen from "../screens/LabelsScreen";
import LabelDetailsScreen from "../screens/LabelDetails";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  // Contexts
  const { isLightTheme, themes } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Labels"
      mode="modal"
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Labels"
        component={LabelsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Label-Details"
        component={LabelDetailsScreen}
        options={({ route }) => ({
          // title: route.params.label.title,
          title: "",
          headerTitleContainerStyle: { paddingVertical: 5 },
          headerStyle: {
            backgroundColor: isLightTheme
              ? themes.light.background
              : themes.dark.background,
          },
          gestureDirection: "horizontal",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        })}
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
