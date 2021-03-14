import { useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

export default function useAppUpdate() {
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

  // Save updated notification in the storage
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

  useEffect(() => {
    runUpdate();
    notifyUpdate();
  }, []);

  return { runUpdate, notifyUpdate };
}
