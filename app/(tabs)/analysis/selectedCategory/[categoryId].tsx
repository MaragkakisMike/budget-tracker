import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@/src/components/Container";
import { useLocalSearchParams } from "expo-router";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import useDatabase from "@/src/hooks/useDatabase";
import { getExpensesByCategory } from "@/src/db/queries/actions";

const SelectedCategory = () => {
  const { categoryId } = useLocalSearchParams();
  const drizzleDB = useDatabase();
  const { data: expenses = [] } = useLiveQuery(
    getExpensesByCategory(drizzleDB, parseInt(categoryId as string))
  );

  return (
    <Container>
      <View>
        <Text>SelectedCategory</Text>
        <Text>Category ID: {categoryId}</Text>
      </View>
    </Container>
  );
};

export default SelectedCategory;

const styles = StyleSheet.create({});
