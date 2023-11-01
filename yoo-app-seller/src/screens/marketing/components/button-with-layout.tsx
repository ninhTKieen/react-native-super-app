import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color} from '@/configs/globalStyles';
import {StoreIcon} from '@/screens/store/icons';

type Props = {
  onPress: () => void;
  isFocused: boolean;
  label: string;
  disabled?: boolean;
};

const width = Dimensions.get('screen').width;

const ButtonWithLayout = ({onPress, isFocused, label, disabled}: Props) => {
  return (
    <>
      {isFocused ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          style={{opacity: disabled ? 0.7 : 1}}>
          <View
            style={{
              marginBottom: -36,
              zIndex: 1,
            }}>
            <View style={styles.triangle} />
            <StoreIcon.Check
              style={{left: 4, top: -23}}
              height={12}
              width={12}
            />
          </View>
          <View
            style={[
              styles.button,
              {
                borderWidth: 1,
                borderColor: color.blue2,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Text style={[styles.text, {color: color.blue2}]}>{label}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[
            styles.button,
            {
              borderColor: color.grey8,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text style={[styles.text, {color: color.grey8}]}>{label}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ButtonWithLayout;

const styles = StyleSheet.create({
  container: {},
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 28,
    borderBottomWidth: 24,
    borderBottomColor: 'transparent',
    borderLeftColor: color.blue2,
    borderTopLeftRadius: 9,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    height: 36,
    borderRadius: 10,
    width: width * 0.43,
  },
});
