import { Stack, usePathname } from "expo-router";

export default function AnalysisLayout() {
  const pathname = usePathname();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: pathname.startsWith("/analysis") ? "default" : "none",
      }}
    >
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="selectedCategory/[categoryId]" />
    </Stack>
  );
}
