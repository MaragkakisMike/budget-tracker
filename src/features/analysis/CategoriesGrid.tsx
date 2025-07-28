import { Category } from "@/src/types/category";
import React, { FC } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CategoryCard from "./CategoryCard";
import { useRouter } from "expo-router";
import useColors from "@/src/stores/theme-store";
import { DEFAULT_GAP, MEDIUM_PADDING } from "@/src/constants";

type Props = {
  categories: Category[];
  isCategoryPage?: boolean;
  onNewCategory?: () => void;
  onCategoryPress?: (category: Category) => void;
  onLongPress?: (category: Category) => void;
};

export const CategoriesGrid: FC<Props> = ({
  categories,
  isCategoryPage = false,
  onNewCategory,
  onCategoryPress,
  onLongPress,
}) => {
  const router = useRouter();
  const { colors } = useColors();
  return (
    <View style={styles.cardsContainer}>
      {categories.map((category) => (
        <CategoryCard
          key={category.categoryId}
          category={category}
          onPress={() => {
            if (isCategoryPage) onCategoryPress?.(category);
            else
              router.navigate(
                `/(tabs)/analysis/selectedCategory/${category.categoryId}`
              );
          }}
          onLongPress={() => {
            if (isCategoryPage) onLongPress?.(category);
          }}
        />
      ))}
      {isCategoryPage && (
        <CategoryCard key={-1} isAddCategory onPress={onNewCategory} />
      )}
    </View>
  );
};

export default CategoriesGrid;

const styles = StyleSheet.create({
  cardsContainer: {
    padding: MEDIUM_PADDING,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: DEFAULT_GAP,
  },
  columnWrapper: {
    gap: DEFAULT_GAP,
  },
});
