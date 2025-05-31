import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useColors from "@/src/stores/theme-store";
import { Pressable } from "react-native";

const DeleteSwipeAction = (color) => {
  return (
    <LinearGradient
      colors={["#f00", color]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.99, y: 0 }}
      locations={[0.2, 1]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        borderRadius: 16,
      }}
    >
      <MaterialCommunityIcons name="delete-forever" size={30} color="red" />
    </LinearGradient>
  );
};

const SwipeableItem = ({
  onRightSwipe,
  onPress,
  children,
}: {
  onRightSwipe?: () => void;
  onPress?: () => void;
  children: React.ReactNode;
}) => {
  const { colors } = useColors();
  return (
    <Swipeable
      renderRightActions={() => DeleteSwipeAction(colors.containerBackground)}
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          onRightSwipe();
        } else if (direction === "left") {
          // handle left swipe
        }
      }}
    >
      <Pressable onPress={onPress}>{children}</Pressable>
    </Swipeable>
  );
};

export default SwipeableItem;
