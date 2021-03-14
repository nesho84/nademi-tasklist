import "react-native-gesture-handler";
import React from "react";
import ThemeContextProvider from "./app/context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./app/navigation/DrawerNavigator";

import TasksContextProvider from "./app/context/TasksContext";
import useAppUpdate from "./app/hooks/useAppUpdate";
import usePermissions from "./app/hooks/usePermissions";

export default function App() {
  // update and reload
  useAppUpdate();

  // Ask for MEDIA_LIBRARY permisssion
  usePermissions();

  return (
    // Context Providers -> DrawerNavigator -> MainNavigator
    <NavigationContainer>
      <TasksContextProvider>
        <ThemeContextProvider>
          <DrawerNavigator />
        </ThemeContextProvider>
      </TasksContextProvider>
    </NavigationContainer>
  );
}
