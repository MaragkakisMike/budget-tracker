import { CategoryIcon } from "@/src/components/CategoryIcon";
import useStyles from "@/src/hooks/useStyles";
import { TColors } from "@/src/styles/colors";
import { Category } from "@/src/types/category";
import React, { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}
const { width: screenWidth } = Dimensions.get("window");
const cardWidth = (screenWidth - 40) / 2;

export const CategoryCard: FC<CategoryCardProps> = ({ category, onPress }) => {
  const { styles } = useStyles(createStyles);
  return (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.categoryCardHeader}>
        <View style={styles.categoryCardIcon}>
          <CategoryIcon
            category={{
              icon: category.icon,
              color: category.color,
            }}
            size="md"
          />
        </View>
      </View>

      {category.type === "expense" && (
        <View style={styles.categoryCardPercentContainer}>
          <Text style={styles.categoryCardPercent}>
            {category.percentage || 0}%
          </Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.categoryCardAmount}>{category.totalAmount}€</Text>
        <Text style={styles.categoryCardLabel}>{category.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    categoryCard: {
      backgroundColor: colors.containerBackground,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.07,
      shadowRadius: 9,
      elevation: 5, // for Android
      // paddingVertical: 24,
      // paddingHorizontal: 20,
      width: cardWidth, // Fixed width instead of flex: 1
      position: "relative",
    },
    categoryCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    categoryCardIcon: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      padding: 10,
    },
    categoryCardPercentContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: colors.primaryLight,
      borderRadius: 32,
      borderBottomRightRadius: 0,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: 60,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    categoryCardPercent: {
      fontWeight: "600",
      color: colors.primary,
      fontSize: 14,
      textAlign: "center",
    },
    infoContainer: {
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    categoryCardAmount: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 2,
    },
    categoryCardLabel: {
      color: colors.textSecondary,
      fontSize: 16,
      fontWeight: "500",
    },
  });

export default CategoryCard;
