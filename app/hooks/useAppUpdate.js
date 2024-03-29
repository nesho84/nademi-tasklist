import React, { useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

export default function useAppUpdate(lang) {
  let updateKey = "@Update_Key";

  const runUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        // Save update in the Storage
        await registerUpdate();
        // Relad the app
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (e) {
      // console.log("Update Error: nademi-tasklist could not be updated!");
    }
  };

  // Save updated notification in the storage
  const registerUpdate = async () => {
    try {
      await AsyncStorage.setItem(updateKey, "update available");
    } catch (e) {
      console.log(e);
    }
  };

  // notify te User for an Update
  const notifyUpdate = async () => {
    let item = null;
    try {
      item = await AsyncStorage.getItem(updateKey);
    } catch (e) {
      console.log(e);
    }
    if (item !== null) {
      Alert.alert(
        `${
          lang.current
            ? lang.languages.alerts.appUpdate.title[lang.current]
            : "Update Success"
        }`,
        `${
          lang.current
            ? lang.languages.alerts.appUpdate.message[lang.current]
            : "Update was successful."
        }`,
        [
          {
            text: "OK",
            onPress: async () => await AsyncStorage.removeItem(updateKey),
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      runUpdate();
    }

    return () => (mounted = false);
  }, []);

  return { notifyUpdate };
}
