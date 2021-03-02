import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// Custom colos Object
import colors from "../config/colors";
// Custom Hook
import useTasks from "../hooks/useTasks";
// Custom Components
import AppScreen from "../components/AppScreen";
import AddText from "../components/AddText";
import AppList from "../components/AppList";
import AppModal from "../components/AppModal";
import AppPopup from "../components/AppPopup";

export default function HomeScreen({ navigation }) {
  // Custom Hook returned functions
  let {
    tasks,
    unCheckedTasks,
    checkedTasks,
    modalVisible,
    setModalVisible,
    handleAdd,
    handleChecked,
    handleDelete,
    clearAllTasks,
  } = useTasks();

  // confirm Exit application
  const exitApp = () => {
    Alert.alert("Hold on!", "Are you sure you want to go exit?", [
      { text: "Yes", onPress: () => BackHandler.exitApp() },
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
    ]);
    return true;
  };

  // Screen first renders
  useEffect(() => {
    // Exit app Handler
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
        <Image style={styles.logo} source={require("../assets/nademi.png")} />
        <Text style={styles.title}>Simple TaskList</Text>

        <AppPopup
          navigation={navigation}
          clearAllTasks={clearAllTasks}
          exitApp={exitApp}
          itemsList={tasks}
        />

        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.addButton}>
            <MaterialIcons name="add-circle" size={45} color="white" />
          </View>
        </TouchableOpacity>

        <AppModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          inputRef={inputRef}
        >
          <AddText
            handleAdd={handleAdd}
            setModalVisible={setModalVisible}
            inputRef={inputRef}
          />
        </AppModal>

        {tasks.length > 0 ? (
          // Tasks List
          <View style={styles.listContainer}>
            {unCheckedTasks.length > 0 ? (
              <AppList
                // Unchecked List
                items={unCheckedTasks}
                handleChecked={handleChecked}
                handleDelete={handleDelete}
                style={{ flex: 2 }}
              />
            ) : (
              <View style={styles.noItemsContainer}>
                <Text style={styles.noItemsText}>
                  No Tasks to show.{"\n\n"}
                  <Text>
                    You can use the plus button (+) to create new tasks.
                  </Text>
                </Text>
              </View>
            )}
            {checkedTasks.length > 0 && (
              // List Divider
              <View style={styles.listDividerContainer}>
                <View style={styles.listDivider}></View>
                <Text style={styles.listDividerText}>
                  {checkedTasks.length} Checked Items
                </Text>
              </View>
            )}
            <AppList
              // Checked List
              items={checkedTasks}
              handleChecked={handleChecked}
              handleDelete={handleDelete}
              style={checkedTasks.length > 0 ? { flex: 1 } : { flex: 0 }}
            />
          </View>
        ) : (
          // No Tasks View
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>
              No Tasks to show.{"\n\n"}
              <Text>You can use the plus button (+) to create new tasks.</Text>
            </Text>
          </View>
        )}
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
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 5,
  },
  logo: {
    marginTop: 15,
  },
  title: {
    marginTop: 10,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButtonContainer: {
    width: "80%",
    paddingVertical: 2,
    alignItems: "center",
    backgroundColor: colors.successLight,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  listContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
  },
  listDividerContainer: {
    width: "100%",
    marginTop: 7,
    marginBottom: 3,
  },
  listDivider: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightSkyBlue,
    marginBottom: 1,
  },
  listDividerText: {
    color: colors.checkedItemText,
    fontSize: 13,
  },
  noItemsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.uncheckedItem,
    borderWidth: 1,
    margin: 30,
    padding: 11,
  },
  noItemsText: {
    color: colors.light,
    fontSize: 17,
    textAlign: "center",
  },
});
