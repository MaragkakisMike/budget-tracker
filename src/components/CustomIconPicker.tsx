import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import useColors from "../stores/theme-store";
import { TColors } from "../styles/colors";
import useStyles from "../hooks/useStyles";

const { width } = Dimensions.get("window");

const CustomIconPicker = ({
  showIconPicker = false,
  toggleIconPicker,
  icons = [],
  selectedIcon = "",
  onSelect,
  selectedIconColor = "#007AFF",
  iconSize = 32,
}) => {
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);

  return (
    <>
      <TouchableOpacity
        onPress={toggleIconPicker}
        style={{
          ...styles.selectedIcon,
          backgroundColor: `${selectedIconColor}15`,
        }}
      >
        <FontAwesome5
          name={selectedIcon}
          size={iconSize}
          color={selectedIconColor}
        />
      </TouchableOpacity>

      <Modal
        visible={showIconPicker}
        transparent
        animationType="fade"
        onRequestClose={toggleIconPicker}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Select Icon</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleIconPicker}
                >
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={colors.textPrimary}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.iconsContainer}>
                  <View style={styles.iconsGrid}>
                    {icons.map((icon) => {
                      const isSelected = selectedIcon === icon;
                      return (
                        <TouchableOpacity
                          key={icon}
                          style={[
                            styles.iconButton,
                            isSelected && {
                              backgroundColor: `${selectedIconColor}15`,
                            },
                          ]}
                          onPress={() => {
                            onSelect(icon);
                          }}
                          activeOpacity={0.7}
                        >
                          <View style={styles.iconWrapper}>
                            <FontAwesome5
                              name={icon}
                              size={iconSize}
                              color={
                                isSelected
                                  ? selectedIconColor
                                  : colors.textSecondary
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default CustomIconPicker;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: colors.modalShadow,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    pickerContainer: {
      width: "90%",
      maxHeight: "80%",
      backgroundColor: colors.containerBackground,
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#EEEEEE",
      backgroundColor: colors.containerBackground,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    closeButton: {
      padding: 4,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    iconsContainer: {
      padding: 12,
    },
    iconsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    iconButton: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 4,
      borderRadius: 100 / 2,
      backgroundColor: "transparent",
    },
    iconWrapper: {
      padding: 8,
      borderRadius: 8,
    },
    selectedIcon: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
  });
