import { FC, useCallback, useRef } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Container from "@/src/components/Container";
import CardContainer from "@/src/components/CardContainer";
import useDatabase from "@/src/hooks/useDatabase";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import { CategoryDetails } from "@/src/features/categories/CategoryDetails";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { getCategories } from "@/src/db/queries/categories";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useCategories } from "@/src/contexts/categories-context";
import { CategoryIcon } from "@/src/components/CategoryIcon";
import SwipeableItem from "@/src/components/SwipeableItem";
import { deleteCategory } from "@/src/db/mutations/categories";
import useColors from "@/src/stores/theme-store";
import { useTranslation } from "react-i18next";
import CategoriesGrid from "@/src/features/analysis/CategoriesGrid";
import { Category } from "@/src/types/category";

const Categories: FC = () => {
  const drizzleDB = useDatabase();
  const { setSelectedCategory } = useCategories();
  const categoryBottomSheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();
  const { data: categories } = useLiveQuery(getCategories(drizzleDB));

  const toggleBottomSheet = () => {
    categoryBottomSheetRef.current?.present();
  };

  const handleCategorySelection = useCallback(
    (category) => {
      setSelectedCategory(category);
      categoryBottomSheetRef.current?.present();
    },
    [setSelectedCategory]
  );

  const handleDeleteCategory = useCallback((category) => {
    deleteCategory(drizzleDB, category);
  }, []);

  const filterCategories = () => {
    if (!categories) return [];
    return categories.map((category) => ({
      ...category,
      categoryId: category.id,
      categoryName: category.name,
    })) as Category[];
  };

  return (
    <Container>
      <View style={{ padding: 10, paddingBottom: 0 }}>
        <CardContainer title={t("categories.categories")} />
      </View>
      <CategoriesGrid
        categories={filterCategories()}
        onNewCategory={toggleBottomSheet}
        onCategoryPress={handleCategorySelection}
        onLongPress={handleDeleteCategory}
        isCategoryPage
      />
      <CategoryDetails categoryBottomSheetRef={categoryBottomSheetRef} />
    </Container>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    categoryContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 10,
      backgroundColor: colors.containerBackground,
      // borderBottomWidth: 1,
      // borderBottomColor: "#f0f0f0",
      borderRadius: 10,
      gap: 16,
    },
    categoryName: {
      fontSize: 16,
      color: colors.textPrimary,
    },
  });

export default Categories;
