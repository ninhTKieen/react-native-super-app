import React from 'react';

import {View, Text, StyleSheet, Pressable} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '@/configs/globalStyles';
import {SvgProps} from 'react-native-svg';

interface IProps {
  label: string;
  isRequired?: boolean;
  onPress?: () => void;
  iconLeft: React.FC<SvgProps>;
  textInputValue?: string;
}

const PressableLabel = ({
  label,
  isRequired,
  onPress,
  iconLeft,
  textInputValue,
}: IProps): JSX.Element => {
  const Icon = iconLeft;
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.labelWrapper}>
          <View style={{width: 40}}>
            <Icon />
          </View>
          <Text style={{fontWeight: '500', fontSize: 16, color: color.grey6}}>
            {label}
            {isRequired && <Text style={{color: color.red}}>{' *'}</Text>}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {textInputValue ? (
            <Text>
              {textInputValue?.length <= 18
                ? textInputValue
                : `${textInputValue?.slice(0, 18)} ...`}
            </Text>
          ) : null}
          <MCIcon name="chevron-right" size={25} color={color.primary} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PressableLabel;
