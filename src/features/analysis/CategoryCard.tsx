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
  category?: Category;
  isAddCategory?: boolean;
  onPress?: () => void;
  onLongPress?: (category) => void;
}
const { width: screenWidth } = Dimensions.get("window");
const cardWidth = (screenWidth - 40) / 2;

export const CategoryCard: FC<CategoryCardProps> = ({
  category,
  isAddCategory = false,
  onPress,
  onLongPress,
}) => {
  const { styles } = useStyles(createStyles);

  if (isAddCategory) {
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {
            justifyContent: "center",
            gap: 10,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.categoryCardHeader,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <View
            style={[
              styles.categoryCardIcon,
              {
                backgroundColor: "#f0f0f0",
                borderColor: "#ccc",
                borderWidth: 1,
              },
            ]}
          >
            <CategoryIcon
              category={{ icon: "plus", color: "#ccc" }}
              size="xs"
            />
          </View>
        </View>
        <View
          style={[
            styles.infoContainer,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.categoryCardLabel}>Add category</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={onPress}
        onLongPress={() => {
          if (!!onLongPress) onLongPress(category);
        }}
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

        {category.type === "expense" ? (
          <View style={styles.categoryCardPercentContainer}>
            <Text style={styles.categoryCardPercent}>
              {category.percentage || 0}%
            </Text>
          </View>
        ) : null}

        <View style={styles.infoContainer}>
          {category.totalAmount ? (
            <Text style={styles.categoryCardAmount}>
              {category.totalAmount}€
            </Text>
          ) : null}
          <Text style={styles.categoryCardLabel}>{category.categoryName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
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
      minHeight: 110,
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
      top: -5,
      right: 0,
      backgroundColor: colors.primaryLight,
      borderRadius: 32,
      borderBottomRightRadius: 0,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: 65,
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
