import { Text, View, StyleSheet, TextInput } from "react-native";
import { BottomSheet } from "@/src/components/BottomSheet";
import { FC, useState, useCallback, useEffect } from "react";
import CustomIconPicker from "@/src/components/CustomIconPicker";
import ColorPicker from "react-native-wheel-color-picker";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { Button } from "@/src/components/Button";
import useDatabase from "@/src/hooks/useDatabase";
import { createCategory, updateCategory } from "@/src/db/mutations/categories";
import { useCategories } from "@/src/contexts/categories-context";
import { categoryIcons } from "@/src/constants";
import { useTranslation } from "react-i18next";

export const CategoryDetails = ({ categoryBottomSheetRef }) => {
  const drizzleDB = useDatabase();
  const { styles } = useStyles(createStyles);
  const { colors } = useColors();
  const { selectedCategory, setSelectedCategory } = useCategories();
  const { t } = useTranslation();
  const defaultCategory = {
    name: "",
    icon: categoryIcons[Math.floor(Math.random() * categoryIcons.length)],
    color: "#0000FF",
  };
  const [newCategory, setNewCategory] = useState(defaultCategory);

  useEffect(() => {
    if (selectedCategory) {
      setNewCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // const [selectedColor, setSelectedColor] = useState("#0000FF");
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);
  // const [selectedIcon, setSelectedIcon] = useState(
  //   icons[Math.floor(Math.random() * icons.length)]
  // );

  const handleColorChange = useCallback((color: string) => {
    requestAnimationFrame(() => {
      setNewCategory((prev) => ({ ...prev, color }));
    });
  }, []);

  const handleIconSelect = useCallback((icon) => {
    setNewCategory((prev) => ({ ...prev, icon }));
    setIsIconModalVisible(false);
  }, []);

  const toggleIconPicker = useCallback(() => {
    setIsIconModalVisible((prev) => !prev);
  }, []);

  const handleCreateCategory = () => {
    if (newCategory.name.trim()) {
      createCategory(drizzleDB, newCategory);
      setNewCategory({
        name: "",
        icon: categoryIcons[Math.floor(Math.random() * categoryIcons.length)],
        color: "#0000FF",
      });
      categoryBottomSheetRef.current?.dismiss();
    }
  };

  const handleUpdateCategory = () => {
    const changes = Object.keys(newCategory).reduce((acc, key) => {
      if (newCategory[key] !== selectedCategory[key]) {
        acc[key] = newCategory[key];
      }
      return acc;
    }, {});
    if (Object.keys(changes).length) {
      updateCategory(drizzleDB, selectedCategory.id, changes);
      categoryBottomSheetRef.current?.dismiss();
    }
  };

  const hancleConfirm = () => {
    if (selectedCategory) {
      handleUpdateCategory();
    } else {
      handleCreateCategory();
    }
  };

  const handleDismiss = () => {
    setNewCategory(defaultCategory);
    setSelectedCategory(null);
  };

  return (
    <BottomSheet
      bottomSheetModalRef={categoryBottomSheetRef}
      title={
        selectedCategory
          ? t("categories.edit_category")
          : t("categories.new_category")
      }
      onDismiss={handleDismiss}
    >
      <View style={styles.bottomSheetBody}>
        <View style={styles.topContainer}>
          <CustomIconPicker
            showIconPicker={isIconModalVisible}
            toggleIconPicker={toggleIconPicker}
            icons={categoryIcons}
            selectedIcon={newCategory.icon}
            onSelect={handleIconSelect}
            selectedIconColor={newCategory.color}
            // iconColor={colors.textSecondary}
            iconSize={24}
          />
          <TextInput
            placeholder={t("categories.category_name")}
            style={styles.categoryName}
            placeholderTextColor={colors.textPrimary}
            defaultValue={newCategory.name}
            onChangeText={(name) =>
              setNewCategory((prev) => ({ ...prev, name }))
            }
          />
        </View>
        <View style={styles.colorPicker}>
          <ColorPicker
            color={newCategory.color}
            onColorChange={handleColorChange}
            thumbSize={40}
            noSnap={true}
            row={false}
            useNativeDriver={true}
            useNativeLayout={true}
            swatches={false}
            discrete={true}
            sliderSize={40}
            gapSize={0}
            discreteLength={10}
          />
        </View>
        <Button
          title={selectedCategory ? t("actions.save") : t("actions.confirm")}
          variant="outline"
          icon="chevron-right"
          onPress={hancleConfirm}
        />
      </View>
    </BottomSheet>
  );
};

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    bottomSheetBody: {
      //   height: 350,
      width: "100%",
      alignItems: "center",
      gap: 20,
    },
    topContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 15,
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    colorPicker: {
      flexDirection: "row",
      width: "80%",
      height: 280,
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      margin: 2,
      borderRadius: 20,
      backgroundColor: "transparent",
    },
    categoryName: {
      fontSize: 16,
      color: colors.textPrimary,
      borderBottomWidth: 1,
      borderBottomColor: colors.textPrimary,
      flex: 1,
    },
  });

export default CategoryDetails;
