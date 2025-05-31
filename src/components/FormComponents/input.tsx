import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import useStyles from "@/src/hooks/useStyles";
import { TColors } from "@/src/styles/colors";
import { createStyles } from "./styles";
import useColors from "@/src/stores/theme-store";

interface FormTextInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: any;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
}

export function FormTextInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  error,
  placeholder,
  disabled = false,
  ...rest
}: FormTextInputProps<T>) {
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={value}
            editable={!disabled}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            {...rest}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

export default FormTextInput;
