import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export default function useAppExit() {
  // confirm Exit application
  const exitApp = () => {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to exit?",
      [
        { text: "Yes", onPress: () => BackHandler.exitApp() },
        {
          text: "No",
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    // Exit app Handler
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      exitApp
    );
    return () => backHandler.remove();
  }, []);

  return { exitApp };
}