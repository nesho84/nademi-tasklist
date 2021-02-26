import React, { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

// Custom Components
import AppScreen from "../components/AppScreen";
import AddText from "../components/AddText";
import AppList from "../components/AppList";
import AppModal from "../components/AppModal";
import AppPopup from "../components/AppPopup";

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const { getItem, setItem, removeItem } = useAsyncStorage("@ShoppingList_Key");
  const [modalVisible, setModalVisible] = useState(false);

  // Handling Add item function
  const handleAdd = (text) => {
    if (text.length < 3) {
      Alert.alert(
        "Required field",
        "Please insert at least 3 charachters...",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      // First write the item to the storage
      writeItemToStorage([
        { key: Math.random().toString(), name: text, checked: false },
        ...items,
      ]);
      Keyboard.dismiss();
      setModalVisible(false);
    }
  };

  // Change item from the state and update the storage
  const handleChecked = (itemKey) => {
    // Update items array of objects using 'map' / toggle value 'checked'
    // Fitst method
    const updatedItems = items.map((item) =>
      item.key === itemKey ? { ...item, checked: !item.checked } : item
    );
    // Then set the new state
    setItems(updatedItems);
    // First write the item to the storage
    writeItemToStorage(updatedItems);
  };

  // Delete item from the state and update the storage
  const handleDelete = (itemKey) => {
    const filteredItems = items.filter((item) => item.key !== itemKey);
    // First write the item to the storage
    writeItemToStorage(filteredItems);
    // Then set the new state
    setItems(filteredItems);
  };

  // Read from storage
  const readItemFromStorage = async () => {
    const storageItems = await getItem();
    // console.log(storageItems);

    // Make sure we have a non empty array to avoid android error:
    // (TypeError: Invalid attempt to spread non-iterable instance.)
    storageItems && setItems(JSON.parse(storageItems));
  };

  // Write to the storage
  const writeItemToStorage = async (newItems) => {
    await setItem(JSON.stringify(newItems));
    // Then set the new state
    setItems(newItems);
  };

  // Clear stoage or Remove all items from storage
  const clearStorage = async () => {
    // remove items
    await removeItem();
    // set state
    setItems([]);
  };

  handleModalVisible = (value) => {
    setModalVisible(value);
  };

  const exitApp = () => {
    Alert.alert("Hold on!", "Are you sure you want to go exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  // Screen first renders
  useEffect(() => {
    readItemFromStorage();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      exitApp
    );

    return () => backHandler.remove();
  }, []);

  // Trick to show Keyboard on input focus
  const inputRef = React.useRef();

  return (
    <AppScreen>
      <View style={styles.container}>
        <Image style={styles.Image} source={require("../assets/nademi.png")} />
        <Text style={styles.text}>Simple Shopping List</Text>

        <AppPopup
          navigation={navigation}
          clearStorage={clearStorage}
          exitApp={exitApp}
          itemsList={items}
        />

        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.addButton}>
            <MaterialIcons name="add-circle" size={45} color="white" />
          </View>
        </TouchableOpacity>

        <AppList
          items={items}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
        />

        <AppModal
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          inputRef={inputRef}
        >
          <AddText handleAdd={handleAdd} inputRef={inputRef} />
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelModalButton}>Cancel</Text>
          </TouchableOpacity>
        </AppModal>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    paddingVertical: StatusBar.currentHeight || 0,
  },
  Image: { marginTop: 60, marginBottom: 15 },
  text: {
    marginBottom: 15,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButtonContainer: {
    width: "80%",
    paddingVertical: 2,
    alignItems: "center",
    backgroundColor: "#5cb85c",
    marginTop: 15,
    borderRadius: 20,
  },
  closeModalButton: {
    width: "80%",
    backgroundColor: "#A93238",
    padding: 11,
    marginVertical: 8,
  },
  cancelModalButton: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
