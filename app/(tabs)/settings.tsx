// Settings.tsx
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Container from "@/src/components/Container";
import useColors from "@/src/stores/theme-store";
import { useTranslation } from "react-i18next";
import languages from "@/src/services/languagesList.json";
import useStyles from "@/src/hooks/useStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingItem from "@/src/components/SettingItem";
import { TColors } from "@/src/styles/colors";
import { VERSION } from "@/src/constants";
import { useRouter } from "expo-router";
import Button from "@/src/components/Button";
import { useXlsx } from "@/src/hooks/useXlsx";
import { selectExportDirectory } from "@/src/utils/storage";
interface LanguageItem {
  name: string;
  nativeName?: string;
  flag?: string;
}

interface LanguageList {
  [key: string]: LanguageItem;
}

const Settings: React.FC = () => {
  const { colors, toggleColorsChange, isDarkMode } = useColors();
  const router = useRouter();
  const { styles } = useStyles(createStyles);
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const typedLanguages = languages as LanguageList;
  const { handleExportData } = useXlsx();

  const renderLanguageOptions = () => {
    return (
      <View style={styles.languageContainer}>
        {Object.keys(typedLanguages).map((lng, index) => (
          <SettingItem
            key={lng}
            title={typedLanguages[lng].name}
            showDivider={index < Object.keys(typedLanguages).length - 1}
            rightElement={
              i18n.language === lng ? (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              ) : null
            }
            titleStyle={
              i18n.language === lng
                ? { color: colors.primary, fontWeight: "600" }
                : undefined
            }
            onPress={() => i18n.changeLanguage(lng)}
          />
        ))}
      </View>
    );
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <Text style={styles.heading}>{t("settings.settings")}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.appearance")}</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title={t("settings.toggle_dark_mode")}
              leftIcon={
                <Ionicons
                  name={isDarkMode ? "moon" : "sunny"}
                  size={22}
                  color={colors.primary}
                />
              }
              rightElement={
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleColorsChange}
                  trackColor={{
                    false: colors.trackOffColor,
                    true: colors.trackOnColor,
                  }}
                  thumbColor={colors.thumbColor}
                  ios_backgroundColor={colors.trackOffColor}
                />
              }
              showDivider={false}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.language")}</Text>
          <View style={styles.sectionContent}>{renderLanguageOptions()}</View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("Export/Import data")}</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title={t("Export data")}
              rightElement={
                <Button title={t("Export")} onPress={handleExportData} />
              }
            />
          </View>
          <View style={styles.sectionContent}>
            <SettingItem
              title={t("Change export directory")}
              rightElement={
                <Button title={t("Select")} onPress={selectExportDirectory} />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.about")}</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title={t("settings.app_version")}
              rightElement={<Text style={styles.versionText}>{VERSION}</Text>}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Settings;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: 16,
    },
    heading: {
      fontSize: 32,
      fontWeight: "700",
      color: colors.textPrimary,
      marginTop: 32,
      marginBottom: 28,
    },
    section: {
      marginBottom: 32,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textSecondary,
      marginBottom: 12,
      marginLeft: 8,
    },
    sectionContent: {
      backgroundColor: colors.sectionBackground || colors.background,
      borderRadius: 14,
      overflow: "hidden",
    },
    versionText: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    languageContainer: {
      width: "100%",
    },
  });
