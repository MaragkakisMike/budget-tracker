import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStyles from "../hooks/useStyles";
import { TColors } from "../styles/colors";
import useColors from "../stores/theme-store";

const ContentDividerLoadmoreButton = ({
  isVisible = false,
  toggleVisibility,
}) => {
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();
  const [rotateAnim] = useState(new Animated.Value(isVisible ? 1 : 0));
  const [isRotated, setIsRotated] = useState(isVisible);

  const handlePress = () => {
    const toValue = isRotated ? 0 : 1;

    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setIsRotated(!isRotated);
    toggleVisibility();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handlePress}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              { transform: [{ rotate: rotateInterpolate }] },
            ]}
          >
            <Ionicons
              name="chevron-down"
              size={16}
              color={colors.textSecondary}
            />
          </Animated.View>
          <Text style={styles.buttonText}>Show History</Text>
        </TouchableOpacity>

        <View style={styles.line} />
      </View>
    </View>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.containerBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginHorizontal: 8,
    },
    iconContainer: {
      width: 16,
      height: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 4,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textSecondary,
    },
  });

export default ContentDividerLoadmoreButton;
