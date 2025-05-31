import { FontAwesome5 } from "@expo/vector-icons";
import { View, Pressable, Text, Modal } from "react-native";
import useStyles from "@/src/hooks/useStyles";
import useColors from "@/src/stores/theme-store";
import { createModalStyles } from "./actionStyles";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import useActionStore from "@/src/stores/actions-store";

function ActionsModal({ isModalVisible, toggleModal }) {
  const { t } = useTranslation();
  const { styles } = useStyles(createModalStyles);
  const { colors } = useColors();
  const router = useRouter();
  const { invalidateSelectedAction } = useActionStore();

  const handleActionPress = (action) => {
    invalidateSelectedAction();
    toggleModal();
    router.navigate(`/${action.toLowerCase()}`);
  };

  const handleOverlayPress = () => {
    toggleModal();
  };

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={toggleModal}
    >
      <Pressable style={styles.modalOverlay} onPress={handleOverlayPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.actionsContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => handleActionPress("Expense")}
              >
                <FontAwesome5
                  name="minus-circle"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.modalButtonText}>
                  {t("transactions.expense")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.modalButton}
                onPress={() => handleActionPress("Income")}
              >
                <FontAwesome5
                  name="plus-circle"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.modalButtonText}>
                  {t("transactions.income_label")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.modalButton}
                onPress={() => handleActionPress("Transfer")}
              >
                <FontAwesome5
                  name="exchange-alt"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.modalButtonText}>
                  {t("transactions.transfer")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

export default ActionsModal;
