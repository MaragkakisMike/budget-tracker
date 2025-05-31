import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import useColors from "@/src/stores/theme-store";
import { createStyles } from "./styles";
import useStyles from "@/src/hooks/useStyles";

type ChipItem = {
  label: string;
  value: number;
  color: string;
};

interface FormChipSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  chips: ChipItem[];
  rules?: any;
  error?: FieldError;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  multiple?: boolean;
  onSelect?: (value: number) => void;
}

export function FormChipSelector<T extends FieldValues>({
  control,
  name,
  label,
  chips,
  rules,
  error,
  containerStyle,
  disabled = false,
  multiple = false,
  onSelect,
}: FormChipSelectorProps<T>) {
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);

  const handleChipSelect = (
    chipValue: number,
    currentValue: number | number[],
    onChange: (value: number | number[]) => void
  ) => {
    if (multiple) {
      const selectedChips = Array.isArray(currentValue) ? currentValue : [];

      if (selectedChips.includes(chipValue)) {
        onChange(selectedChips.filter((value) => value !== chipValue));
      } else {
        onChange([...selectedChips, chipValue]);
      }
    } else {
      if (currentValue === chipValue) {
        onChange(null);
      } else {
        onChange(chipValue);
      }
      onSelect?.(chipValue);
    }
  };

  const isChipSelected = (
    chipValue: number,
    currentValue: number | number[]
  ) => {
    if (multiple) {
      return Array.isArray(currentValue) && currentValue.includes(chipValue);
    } else {
      return currentValue === chipValue;
    }
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={styles.chipsContainer}>
            {chips.map((chip) => {
              const isSelected = isChipSelected(chip.value, value);

              return (
                <TouchableOpacity
                  key={chip.value}
                  onPress={() =>
                    !disabled && handleChipSelect(chip.value, value, onChange)
                  }
                  disabled={disabled}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isSelected ? chip.color : "transparent",
                      borderColor: chip.color,
                      opacity: disabled ? 0.5 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      {
                        color: isSelected ? colors.white : colors.textPrimary,
                      },
                    ]}
                  >
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

export default FormChipSelector;
