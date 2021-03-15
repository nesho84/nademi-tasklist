import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { TasksContext } from "../context/TasksContext";
import { ThemeContext } from "../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
// Custom colos Object
import colors from "../config/colors";
// Custom Components
import AppScreen from "../components/AppScreen";
import AppNavbar from "../components/AppNavbar";
import AppLoading from "../components/AppLoading";
import AppModal from "../components/AppModal";
import LabelsList from "../components/labels/LabelsList";
import AddLabel from "../components/labels/AddLabel";
import EditLabel from "../components/labels/EditLabel";

export default function LabelsScreen(props) {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [labelToEdit, setLabelToEdit] = useState(null);
  // Contexts
  const { isLightTheme, themes } = useContext(ThemeContext);
  const { labels, loading, addLabel, editLabel, orderLabels } = useContext(
    TasksContext
  );

  // Handle Add Label
  const handleAddLabel = (text, color) => {
    addLabel(text, color);
    setAddModalVisible(false);
  };

  // Open modal for editing Label
  const handleEditModal = (item) => {
    setLabelToEdit(item);
    setEditModalVisible(true);
  };

  // Handle Edit Label
  const handleEditLabel = (labelKey, input, color) => {
    editLabel(labelKey, input, color);
    setEditModalVisible(false);
  };

  return (
    <AppScreen>
      <AppNavbar />

      {loading ? (
        // -----Loading state-----
        <AppLoading isLightTheme={isLightTheme} />
      ) : (
        // -----Main View START-----
        <View style={styles.container}>
          {/* -----Labels List----- */}
          <LabelsList
            labels={labels}
            orderLabels={orderLabels}
            isLightTheme={isLightTheme}
            handleEditModal={handleEditModal}
          />

          {/* Add Label Button START */}
          <View style={styles.divider}></View>
          <View
            style={[
              styles.addButtonContainer,
              {
                backgroundColor: isLightTheme ? colors.dodgerblue : colors.dark,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: isLightTheme
                    ? colors.successLight
                    : colors.darkGrey,
                },
              ]}
              onPress={() => setAddModalVisible(true)}
            >
              <MaterialIcons name="add-circle" size={40} color="white" />
            </TouchableOpacity>
          </View>
          {/* Add Label Button END */}
        </View>
        // -----Main View END-----
      )}

      {/* Add Label Modal */}
      <AppModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
      >
        <AddLabel handleAddLabel={handleAddLabel} />
      </AppModal>

      {/* Edit Label Modal */}
      <AppModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
      >
        <EditLabel
          labelToEdit={labelToEdit}
          handleEditLabel={handleEditLabel}
        />
      </AppModal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    alignSelf: "stretch",
    borderTopColor: colors.light,
    borderTopWidth: 1,
  },
  addButtonContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    paddingVertical: 5,
  },
  addButton: {
    width: "70%",
    alignItems: "center",
    borderRadius: 20,
  },
});
