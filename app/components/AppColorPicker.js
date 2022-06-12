import { StyleSheet, TouchableOpacity, } from "react-native";
import colors from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppColorPicker({ labelColor, handleLabelColor }) {
    return colors.labelBgColors.map((color) => {
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
        );
    });
}

const styles = StyleSheet.create({
    selectColor: {
        width: 30,
        height: 30,
        borderRadius: 5,
        margin: 2,
    },
});
