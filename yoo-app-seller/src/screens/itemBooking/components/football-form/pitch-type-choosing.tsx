import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

type Props = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PitchTypeChoosing = (props: Props) => {
  const {t} = useTranslation();
  const {setValue} = useFormContext();

  const PITCH_TYPE_LIST = [
    {
      id: 1,
      name: t(i18nKeys.itemBooking.attributeDetails.football.threeSide),
    },
    {
      id: 2,
      name: t(i18nKeys.itemBooking.attributeDetails.football.fiveSide),
    },
    {
      id: 3,
      name: t(i18nKeys.itemBooking.attributeDetails.football.sevenSide),
    },
    {
      id: 4,
      name: t(i18nKeys.itemBooking.attributeDetails.football.elevenSide),
    },
  ];

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={() => {
        props.setVisible(false);
      }}
      backdropTransitionOutTiming={100}
      animationOutTiming={100}
      style={styles.container}>
      <View style={styles.modalContainer}>
        {PITCH_TYPE_LIST.map(item => (
          <TouchableOpacity
            onPress={() => {
              setValue('properties.type', item.name);
              props.setVisible(false);
            }}
            key={item.id}
            style={styles.typeValue}>
            <Text style={{fontSize: 16}}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    padding: 10,
  },

  typeValue: {
    padding: 10,
  },
});

export default PitchTypeChoosing;
