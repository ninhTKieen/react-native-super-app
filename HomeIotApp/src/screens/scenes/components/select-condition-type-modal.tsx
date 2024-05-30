import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import {
  EAutomationSceneConditionsType,
  ICreateAutomationScene,
} from '@src/features/scenes/scene.model';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Surface, Text } from 'react-native-paper';

type TAutomationConditionModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const SelectConditionTypeModal = (props: TAutomationConditionModalProps) => {
  const { t } = useTranslation();

  const form = useFormContext<ICreateAutomationScene>();

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={() => props.setIsVisible(false)}
      onBackButtonPress={() => props.setIsVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      style={styles.modal}
    >
      <View style={{ borderRadius: 10, backgroundColor: colors.white }}>
        <Pressable
          onPress={() => {
            form.setValue('conditionsType', EAutomationSceneConditionsType.ALL);
            props.setIsVisible(false);
          }}
        >
          <Surface
            style={[
              styles.itemRow,
              {
                backgroundColor:
                  form.watch('conditionsType') ===
                  EAutomationSceneConditionsType.ALL
                    ? colors.primary
                    : colors.white,
              },
            ]}
          >
            <Text
              style={{
                textAlign: 'center',
                color:
                  form.watch('conditionsType') ===
                  EAutomationSceneConditionsType.ALL
                    ? colors.white
                    : colors.black,
              }}
            >
              {t(i18nKeys.scene.automation.allConditionsMet)}
            </Text>
          </Surface>
        </Pressable>

        <Pressable
          onPress={() => {
            form.setValue('conditionsType', EAutomationSceneConditionsType.ANY);
            props.setIsVisible(false);
          }}
        >
          <Surface
            style={[
              styles.itemRow,
              {
                backgroundColor:
                  form.watch('conditionsType') ===
                  EAutomationSceneConditionsType.ANY
                    ? colors.primary
                    : colors.white,
                paddingBottom: 30,
              },
            ]}
          >
            <Text
              style={{
                textAlign: 'center',
                color:
                  form.watch('conditionsType') ===
                  EAutomationSceneConditionsType.ANY
                    ? colors.white
                    : colors.black,
              }}
            >
              {t(i18nKeys.scene.automation.anyConditionMet)}
            </Text>
          </Surface>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },

  itemRow: {
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
});

export default SelectConditionTypeModal;
