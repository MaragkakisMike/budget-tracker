import { Category } from "@/src/types/category";
import { FC } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CategoryCard from "./CategoryCard";

type Props = {
  categories: Category[];
};

export const CategoriesGrid: FC<Props> = ({ categories }) => {
  return (
    <View style={styles.cardsContainer}>
      {categories.map((category) => (
        <CategoryCard
          key={category.categoryId}
          category={category}
          onPress={() =>
            console.log(`Selected category: ${category.categoryName}`)
          }
        />
      ))}
    </View>
  );
};

export default CategoriesGrid;

const styles = StyleSheet.create({
  cardsContainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  columnWrapper: {
    gap: 16,
  },
});
