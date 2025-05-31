import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { ThemeProvider } from "@/src/contexts/theme-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DATABASE_NAME } from "@/src/db/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/src/drizzle/migrations";
import { db } from "@/src/db/client";
import { CategoriesProvider } from "@/src/contexts/categories-context";
import "@/src/services/i18next";
const StackLayout = () => {
  const { success, error } = useMigrations(db, migrations);
  if (error) {
    console.error(error);
  } else if (success) {
    console.log("Database ran successfully");
  }
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <CategoriesProvider>
              <SQLiteProvider
                databaseName={DATABASE_NAME}
                options={{ enableChangeListener: true }}
                useSuspense
              >
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="[action]"
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack>
              </SQLiteProvider>
            </CategoriesProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Suspense>
  );
};

export default StackLayout;
