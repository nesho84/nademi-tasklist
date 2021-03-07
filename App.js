import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContextProvider from "./app/context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./app/navigation/DrawerNavigator";

import * as Permissions from "expo-permissions";
import * as Updates from "expo-updates";
import TasksContextProvider from "./app/context/TasksContext";

export default function App() {
  // update and reload
  const runUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        // ... notify user of update ...
        registerUpdate();
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (e) {
      console.log("Update Error: nademi-tasklist could not be updated!");
    }
  };

  // Save updated in the storage
  const registerUpdate = async () => {
    try {
      await AsyncStorage.setItem("@Update_Key", "yes");
    } catch (e) {
      console.log(e);
    }
  };
  // notify te User for an Update
  const notifyUpdate = async () => {
    let item = [];
    try {
      item = await AsyncStorage.getItem("@Update_Key");
    } catch (e) {
      console.log(e);
    }
    if (item !== null) {
      Alert.alert(
        "Update Success",
        "Update was successful. You can now use your updated nademi-tasklist.",
        [
          {
            text: "OK",
            onPress: async () => await AsyncStorage.removeItem("@Update_Key"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  // Ask for MEDIA_LIBRARY permisssion first
  const requestStoragePermissions = async () => {
    const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (!permission || permission.status !== "granted") {
      return alert("You need to enable permissions to access the storage.");
    }
  };

  // Ask for permission when component renders for the first time
  useEffect(() => {
    runUpdate();
    notifyUpdate();
    requestStoragePermissions();
  }, []);

  return (
    // Context Providers
    // DrawerNavigator -> MainNavigator
    <ThemeContextProvider>
      <NavigationContainer>
        <TasksContextProvider>
          <DrawerNavigator />
        </TasksContextProvider>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}
