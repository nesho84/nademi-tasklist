import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          headerShown={false}
          options={{
            title: "Home",
            headerShown: false,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            title: "About",
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
