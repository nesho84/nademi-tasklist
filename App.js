import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import * as Permissions from "expo-permissions";

// Custom Components
import HomeNavigator from "./app/navigation/HomeNavigator";

export default function App() {
  // Ask for MEDIA_LIBRARY permisssion first
  const requestStoragePermissions = async () => {
    const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (!permission || permission.status !== "granted") {
      return alert("You need to enable permissions to access the storage.");
    }
  };

  // Ask for permission when component renders for the first time
  useEffect(() => {
    requestStoragePermissions();
  }, []);

  // return Home stack navigation
  return <HomeNavigator />;
}

const styles = StyleSheet.create({});
