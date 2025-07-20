import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  Platform,
} from "react-native";
import ActionsModal from "@/src/components/ActionModal";
import useColors from "@/src/stores/theme-store";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["bottom"]}>
      <ActionsModal isModalVisible={isModalVisible} toggleModal={toggleModal} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            ...styles.tabBar,
            ...(Platform.OS === "ios" && styles.iosTabBar),
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabContainer}>
                <FontAwesome
                  name="home"
                  size={24}
                  color={focused ? colors.primary : "#999"}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.text,
                    focused && {
                      ...styles.textFocused,
                      color: colors.primary,
                    },
                  ]}
                >
                  {t("navigation.home")}
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="analysis"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabContainer}>
                <FontAwesome
                  name="line-chart"
                  size={24}
                  color={focused ? colors.primary : "#999"}
                />
                <Text
                  numberOfLines={1}
                  style={[styles.text, focused && { ...styles.textFocused }]}
                >
                  {t("navigation.analytics")}
                </Text>
              </View>
            ),
            popToTopOnBlur: true,
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            headerShown: false,
            // tabBarIcon: ({ focused }) => (
            //   <View style={styles.centerButtonContainer}>
            //     <TouchableOpacity
            //       style={{
            //         ...styles.centerButton,
            //         backgroundColor: colors.primary,
            //       }}
            //       onPress={toggleModal}
            //     >
            //       <FontAwesome5 name="plus" size={24} color="white" />
            //     </TouchableOpacity>
            //   </View>
            // ),
            tabBarButton: () => (
              <View style={styles.centerButtonContainer}>
                <TouchableOpacity
                  style={{
                    ...styles.centerButton,
                    backgroundColor: colors.primary,
                  }}
                  onPress={toggleModal}
                >
                  <FontAwesome5 name="plus" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabContainer}>
                <Ionicons
                  name="grid"
                  size={24}
                  color={focused ? colors.primary : "#999"}
                />
                <Text
                  numberOfLines={1}
                  style={[styles.text, focused && { ...styles.textFocused }]}
                >
                  {t("navigation.categories")}
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabContainer}>
                <FontAwesome
                  name="cog"
                  size={24}
                  color={focused ? colors.primary : "#999"}
                />
                <Text
                  numberOfLines={1}
                  style={[styles.text, focused && { ...styles.textFocused }]}
                >
                  {t("navigation.settings")}
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};
const createStyles = (colors: TColors) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: colors.containerBackground,
    },
    tabBar: {
      position: "relative",
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      backgroundColor: colors.containerBackground,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      elevation: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    iosTabBar: {
      height: 0,
      elevation: 0,
    },
    tabContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 50,
      maxWidth: 80,
    },
    centerButtonContainer: {
      position: "absolute",
      bottom: Platform.OS === "ios" ? -25 : 20,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    centerButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "grey",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    text: {
      color: "lightgrey",
      fontSize: 10,
      textAlign: "center",
      width: "100%",
    },
    textFocused: {
      fontWeight: "600",
      color: colors.primary,
    },
  });
