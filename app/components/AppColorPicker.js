import React from "react";
import { StyleSheet, TouchableOpacity, View, } from "react-native";
import colors from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppColorPicker({ labelColor, handleLabelColor }) {
    return (
        <View style={styles.selectColorContainer}>
            {colors.labelBgColors.map((color) => {
                return (
                    <TouchableOpacity
                        key={color}
                        style={[styles.selectColor, { backgroundColor: color }]}
                        onPress={() => handleLabelColor(color)}
                    >
                        {labelColor === color && (
                            <MaterialIcons name="check" size={30} color="white" />
                        )}
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    selectColorContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 12,
        borderColor: colors.lightMuted,
        borderWidth: 2,
        borderRadius: 5,
        padding: 2,
    },
    selectColor: {
        width: 30,
        height: 30,
        borderRadius: 5,
        margin: 2,
    },
});
