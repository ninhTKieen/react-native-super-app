import React from 'react';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {color} from '@/configs/globalStyles';

const width = Dimensions.get('window').width;

const Buttons = (props: any): JSX.Element => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.cancel]}
        onPress={() => navigation.goBack()}>
        <Text style={{fontSize: 16, color: color.primary}}>
          {t(i18nKeys.common.cancel)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.save]}
        onPress={props.onCreate}>
        <Text style={{fontSize: 16, color: '#fff'}}>
          {t(i18nKeys.common.save)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: color.white,
    justifyContent: 'space-around',
    paddingVertical: 15,
    width: '100%',
    flexDirection: 'row',
  },

  cancel: {
    borderColor: color.primary,
    width: width / 2 - 50,
    marginRight: 10,
  },

  save: {
    borderColor: color.primary,
    width: width / 2 + 10,
    marginLeft: 10,
    backgroundColor: color.primary,
  },
  button: {
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Buttons;
