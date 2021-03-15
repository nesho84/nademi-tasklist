import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export default function useAppExit() {
  const handleBackhandler = () => {
    BackHandler.exitApp();
  };
  // confirm Exit application
  const exitApp = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: handleBackhandler },
    ]);
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
