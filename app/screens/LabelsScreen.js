import React, { useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
// Contexts
import { TasksContext } from "../context/TasksContext";
import { LanguageContext } from "../context/LanguageContext";
// Custom Hooks
import useAppUpdate from "../hooks/useAppUpdate";
// Custom Components
import AppScreen from "../components/AppScreen";
import AppNavbar from "../components/AppNavbar";
import AppLoading from "../components/AppLoading";
import AppModal from "../components/AppModal";
import LabelsList from "../components/labels/LabelsList";
import AddLabel from "../components/labels/AddLabel";
import EditLabel from "../components/labels/EditLabel";
import AddLabelButton from "../components/labels/AddLabelButton";

export default function LabelsScreen() {
  const { lang } = useContext(LanguageContext);
  const {
    labels,
    isLoading,
    addLabel,
    editLabel,
    orderLabels,
  } = useContext(TasksContext);

  const { checkForUpdates } = useAppUpdate(lang);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [labelToEdit, setLabelToEdit] = useState(null);

  // Check for app Update on screen focus
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      if (mounted) {
        checkForUpdates();
      }
      return () => {
        mounted = false;
      };
    }, [])
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

  // Show a loading spinner
  if (isLoading) {
    return <AppLoading lang={lang} />;
  }

  return (
    <AppScreen>
      <AppNavbar />

      {/* // -----Main View START----- */}
      <View style={styles.container}>
        {/* -----Labels List----- */}
        <LabelsList
          labels={labels}
          orderLabels={orderLabels}
          handleEditModal={handleEditModal}
          lang={lang}
        />

        {/* Add Label Button -> Footer */}
        <AddLabelButton setModalVisible={setAddModalVisible} />

        {/* Add Label Modal */}
        <AppModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
        >
          <AddLabel handleAddLabel={handleAddLabel} lang={lang} />
        </AppModal>

        {/* Edit Label Modal */}
        <AppModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
        >
          <EditLabel
            labelToEdit={labelToEdit}
            handleEditLabel={handleEditLabel}
            lang={lang}
          />
        </AppModal>
      </View>
      {/* // -----Main View END----- */}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
