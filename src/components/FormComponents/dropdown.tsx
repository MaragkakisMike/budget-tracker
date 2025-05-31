import { View, Text, StyleSheet, ViewStyle } from "react-native";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import useColors from "@/src/stores/theme-store";
import DropdownSelect from "../DropdownSelect";
import { createStyles } from "./styles";
import useStyles from "@/src/hooks/useStyles";

type DropdownItem = {
  label: string;
  value: number;
};

interface FormDropdownSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  items: DropdownItem[];
  placeholder?: string;
  rules?: any;
  error?: FieldError;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

export function FormDropdownSelect<T extends FieldValues>({
  control,
  name,
  label,
  items,
  placeholder,
  rules,
  error,
  containerStyle,
  disabled = false,
}: FormDropdownSelectProps<T>) {
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DropdownSelect
            items={items}
            placeholder={placeholder}
            selectedValue={value}
            onValueChange={onChange}
            error={!!error}
            disabled={disabled}
            containerStyle={{
              ...containerStyle,
            }}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

export default FormDropdownSelect;
