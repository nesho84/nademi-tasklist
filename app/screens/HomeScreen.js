import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
// header Elements
import { Header, Icon, Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
// Custom colos Object
import colors from "../config/colors";
// Custom Hook
import useTasks from "../hooks/useTasks";
// Custom Components
import AppScreen from "../components/AppScreen";
import AppList from "../components/AppList";
import AppModal from "../components/AppModal";
import AppPopup from "../components/AppPopup";
import AddInput from "../components/AddInput";
import EditInput from "../components/EditInput";

export default function HomeScreen({ navigation }) {
  const [modalAction, setModalAction] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  // Custom Hook returned functions
  let {
    tasks,
    unCheckedTasks,
    checkedTasks,
    modalVisible,
    setModalVisible,
    handleAdd,
    handleEdit,
    handleChecked,
    handleOrderedTasks,
    handleDelete,
    clearAllTasks,
  } = useTasks();

  // Trick to show Keyboard on input focus
  const inputRef = React.useRef();

  // Open modal for add or edit Task
  const handleModalAction = (task, action) => {
    if (action === "add") {
      setModalAction("add");
    } else {
      setModalAction("edit");
      setTaskToEdit(task);
    }
    setModalVisible(true);
  };

  return (
    <AppScreen>
      <Header
        leftComponent={
          <Icon
            name="menu"
            type="material-community"
            color="#fff"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        }
        centerComponent={{
          text: "Simple TaskList",
          style: styles.title,
        }}
        rightComponent={
          <AppPopup
            navigation={navigation}
            clearAllTasks={clearAllTasks}
            itemsList={tasks}
          />
        }
        containerStyle={{
          backgroundColor: "dodgerblue",
        }}
      />
      <StatusBar backgroundColor="dodgerblue" />
      <View style={styles.container}>
        <AppModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          inputRef={inputRef}
        >
          {modalAction === "add" ? (
            <AddInput
              handleAdd={handleAdd}
              setModalVisible={setModalVisible}
              inputRef={inputRef}
            />
          ) : (
            <EditInput
              taskToEdit={taskToEdit}
              handleEdit={handleEdit}
              setModalVisible={setModalVisible}
              inputRef={inputRef}
            />
          )}
        </AppModal>

        {tasks.length > 0 ? (
          // Tasks List
          <View style={styles.listContainer}>
            {unCheckedTasks.length > 0 ? (
              <AppList
                // Unchecked List
                items={unCheckedTasks}
                handleModalAction={handleModalAction}
                handleChecked={handleChecked}
                handleOrderedTasks={handleOrderedTasks}
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
              <View style={styles.checkListDividerContainer}>
                <View style={styles.listDivider}></View>
                <Text style={styles.listDividerText}>
                  {checkedTasks.length} Checked Items
                </Text>
              </View>
            )}
            <AppList
              // Checked List
              items={checkedTasks}
              handleModalAction={handleModalAction}
              handleChecked={handleChecked}
              handleOrderedTasks={handleOrderedTasks}
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
        <Divider style={styles.nativeDivider} />
        <TouchableOpacity
          // Add Button
          style={styles.addButtonContainer}
          onPress={() => handleModalAction(null, "add")}
        >
          <View style={styles.addButton}>
            <MaterialIcons name="add-circle" size={45} color="white" />
          </View>
        </TouchableOpacity>
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
    paddingTop: 10,
    paddingBottom: 5,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButtonContainer: {
    width: "70%",
    // marginTop: 5,
    alignItems: "center",
    backgroundColor: colors.successLight,
    borderRadius: 20,
  },
  listContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
  },
  checkListDividerContainer: {
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
  nativeDivider: {
    width: "100%",
    height: 0.2,
    backgroundColor: colors.light,
    marginVertical: 5,
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
