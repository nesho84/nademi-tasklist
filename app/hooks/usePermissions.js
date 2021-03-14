import React, { useEffect } from "react";
import * as Permissions from "expo-permissions";

export default function usePermissions() {
  // Ask for MEDIA_LIBRARY permisssion first
  const requestStoragePermissions = async () => {
    const permission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (!permission || permission.status !== "granted") {
      return alert("You need to enable permissions to access the storage.");
    }
  };

  useEffect(() => {
    requestStoragePermissions();
  }, []);

  return { requestStoragePermissions };
}
