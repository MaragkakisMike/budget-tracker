import React, { useMemo } from "react";
import { Text, StyleSheet, Animated } from "react-native";
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { LARGE_MARGIN, LARGE_PADDING } from "../constants";

export const BottomSheet = ({ bottomSheetModalRef, title, ...props }) => {
  const { styles } = useStyles(createStyles);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={styles.modalBackground}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={(backdropProps) => (
        <CustomBackdrop {...backdropProps} />
      )}
      {...props}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
  const { colors } = useColors();
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
    ],
    [style]
  );

  return <Animated.View style={containerStyle} />;
};
const createStyles = (colors: TColors) =>
  StyleSheet.create({
    modalBackground: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.containerBackground,
    },
    handleIndicator: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.textPrimary,
    },
    contentContainer: {
      // flex: 1,
      paddingHorizontal: LARGE_PADDING,
      paddingBottom: LARGE_PADDING,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: LARGE_MARGIN,
      color: colors.textPrimary,
    },
  });
