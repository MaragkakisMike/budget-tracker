import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { TColors } from "@/src/styles/colors";
import DropdownSelect from "@/src/components/DropdownSelect";
import {
  LARGE_PADDING,
  DEFAULT_PADDING,
  MEDIUM_PADDING,
  SMALL_MARGIN,
} from "@/src/constants";

type Props = {
  years: number[];
  selectedYear: number;
  handleYearSelection: (year: number) => void;
};

export const YearSelector = ({
  years,
  selectedYear,
  handleYearSelection,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();

  const currentIndex = years.indexOf(selectedYear);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < years.length - 1;

  const selectYear = (year: number) => {
    setModalVisible(false);
    handleYearSelection(year);
  };

  const handleYearTextClick = () => {
    if (years.length === 1) return;
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Left Arrow */}
      <TouchableOpacity
        disabled={!hasPrev}
        onPress={() => handleYearSelection(years[currentIndex - 1])}
        style={styles.arrow}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={hasPrev ? colors.textPrimary : colors.border}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleYearTextClick}>
        <Text style={styles.yearText}>{selectedYear}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!hasNext}
        onPress={() => handleYearSelection(years[currentIndex + 1])}
        style={styles.arrow}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={hasNext ? colors.textPrimary : colors.border}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.yearItem,
                    item === selectedYear && styles.activeYearItem,
                  ]}
                  onPress={() => selectYear(item)}
                >
                  <Text
                    style={[
                      styles.yearItemText,
                      item === selectedYear && styles.activeYearItemText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: SMALL_MARGIN,
    },
    arrow: {
      paddingHorizontal: MEDIUM_PADDING,
    },
    yearText: {
      fontSize: 20,
      fontWeight: "500",
      paddingHorizontal: DEFAULT_PADDING,
      color: colors.textPrimary,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContent: {
      backgroundColor: colors.containerBackground,
      marginHorizontal: 40,
      borderRadius: 8,
      paddingVertical: LARGE_PADDING,
      elevation: 5,
    },
    yearItem: {
      paddingVertical: MEDIUM_PADDING,
      alignItems: "center",
    },
    activeYearItem: {
      backgroundColor: "#eee",
    },
    yearItemText: {
      fontSize: 18,
      color: colors.textPrimary,
    },
    activeYearItemText: {
      fontWeight: "bold",
      color: colors.textPrimary,
    },
  });

export default YearSelector;
