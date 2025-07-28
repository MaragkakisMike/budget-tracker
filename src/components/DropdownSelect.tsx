import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import useColors from "@/src/stores/theme-store";
import {
  LARGE_PADDING,
  DEFAULT_PADDING,
  MEDIUM_PADDING,
  SMALL_PADDING,
} from "../constants";

type DropdownItem = {
  label: string;
  value: string | number;
};

type DropdownSelectProps = {
  items: DropdownItem[];
  selectedValue: string | number | null;
  onValueChange: (value: string | number | null) => void;
  placeholder?: string;
  containerStyle?: object;
  disabled?: boolean;
  error?: boolean;
};

const DropdownSelect = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  containerStyle,
  disabled = false,
  error = false,
}: DropdownSelectProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useColors();

  const styles = createStyles(colors);

  const selectedItem = items.find(
    (item) => String(item.value) === String(selectedValue)
  );

  const toggleModal = () => {
    if (!disabled) {
      setModalVisible(!modalVisible);
    }
  };

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          disabled && styles.disabledButton,
          error && { borderColor: colors.red },
        ]}
        onPress={toggleModal}
        disabled={disabled}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !selectedItem && styles.placeholderText,
          ]}
          numberOfLines={1}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Feather
          name="chevron-down"
          size={18}
          color={disabled ? colors.textSecondary : colors.textPrimary}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedValue === item.value && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(item.value.toString())}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === item.value && styles.selectedItemText,
                    ]}
                  >
                    {item.label}
                  </Text>

                  {selectedValue === item.value && (
                    <Feather name="check" size={18} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
              style={styles.optionsList}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    dropdownButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.cardBackground,
      borderColor: colors.textPrimary,
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: MEDIUM_PADDING,
      paddingVertical: MEDIUM_PADDING,
    },
    disabledButton: {
      backgroundColor: colors.disabledBackground,
      borderColor: colors.disabledBorder,
    },
    dropdownButtonText: {
      fontSize: 16,
      color: colors.textPrimary,
      flex: 1,
    },
    placeholderText: {
      color: colors.textSecondary,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: LARGE_PADDING,
    },
    modalContent: {
      backgroundColor: colors.background,
      borderRadius: 12,
      width: "90%",
      maxHeight: "80%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: DEFAULT_PADDING,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    optionsList: {
      paddingVertical: SMALL_PADDING,
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: MEDIUM_PADDING,
      paddingHorizontal: DEFAULT_PADDING,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    selectedItem: {
      backgroundColor: colors.highlightBackground,
    },
    optionText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    selectedItemText: {
      color: colors.primary,
      fontWeight: "500",
    },
  });

export default DropdownSelect;
