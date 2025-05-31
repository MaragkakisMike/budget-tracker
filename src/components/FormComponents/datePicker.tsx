import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import useColors from "@/src/stores/theme-store";
import { createStyles } from "./styles";
import useStyles from "@/src/hooks/useStyles";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: FieldError;
  dateFormat?: string;
  disabled?: boolean;
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  error,
  dateFormat = "en-US",
  disabled = false,
}: FormDatePickerProps<T>) {
  const { colors } = useColors();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { styles } = useStyles(createStyles);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(dateFormat, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <Pressable
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
              disabled={disabled}
            >
              <Text style={styles.dateText}>{formatDate(value)}</Text>
              <FontAwesome5
                name="calendar-alt"
                size={18}
                color={colors.primary}
              />
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={value}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    onChange(selectedDate);
                  }
                }}
              />
            )}
          </>
        )}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

export default FormDatePicker;
