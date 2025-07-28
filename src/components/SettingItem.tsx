// SettingItem.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import useStyles from "@/src/hooks/useStyles";
import {
  DEFAULT_MARGIN,
  DEFAULT_PADDING,
  EXTRA_SMALL_MARGIN,
  MEDIUM_MARGIN,
} from "../constants";

interface SettingItemProps extends Omit<PressableProps, "style"> {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showDivider?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  rightElement,
  leftIcon,
  showDivider = true,
  containerStyle,
  titleStyle,
  subtitleStyle,
  ...pressableProps
}) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        {...pressableProps}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressablePressed,
        ]}
      >
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <View style={styles.textContainer}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
            )}
          </View>
          {rightElement && (
            <View style={styles.rightElementContainer}>{rightElement}</View>
          )}
        </View>
      </Pressable>
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    pressable: {
      paddingVertical: DEFAULT_PADDING,
      paddingHorizontal: DEFAULT_PADDING,
    },
    pressablePressed: {
      opacity: 0.7,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
    },
    leftIconContainer: {
      marginRight: DEFAULT_MARGIN,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      color: colors.textPrimary,
      fontWeight: "500",
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: EXTRA_SMALL_MARGIN,
    },
    rightElementContainer: {
      marginLeft: MEDIUM_MARGIN,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.divider || colors.border || "#E0E0E0",
      opacity: 0.5,
      marginLeft: DEFAULT_MARGIN,
    },
  });

export default SettingItem;
