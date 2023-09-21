import React from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

export default function useAppUpdate(lang) {
  let updateStorageKey = "@AppUpdateStatus";

  const checkForUpdates = async () => {
    // Show alert if Update was Successful
    notifyUpdate();

    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await AsyncStorage.setItem(updateStorageKey, "available");
        Alert.alert(
          lang.current
            ? lang.languages.alerts.appUpdateAvailable.title[lang.current]
            : "Update Available",
          lang.current
            ? lang.languages.alerts.appUpdateAvailable.message[lang.current]
            : "An update is available for the app.",
          [
            {
              text: "OK",
              onPress: () => {
                reloadApp();
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      // console.log("Error checking for updates:", error);
    }
  };

  const reloadApp = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.log("Error reloading app:", error);
    }
  };

  const notifyUpdate = async () => {
    try {
      const updateStatus = await AsyncStorage.getItem(updateStorageKey);
      if (updateStatus === "available") {
        Alert.alert(
          lang.current
            ? lang.languages.alerts.appUpdate.title[lang.current]
            : "Update Successful",
          lang.current
            ? lang.languages.alerts.appUpdate.message[lang.current]
            : "The app has been successfully updated.",
          [
            {
              text: "OK",
              onPress: async () => {
                await AsyncStorage.removeItem(updateStorageKey);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("Error notifying update:", error);
    }
  }

  return { checkForUpdates };
}
