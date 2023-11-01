import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
type Props = {
  title: string;
  numberRate: number;
  selected: boolean;
  setSelected: Function;
};
const {width} = Dimensions.get('screen');
const ButtonFilterRate = ({
  title,
  numberRate,
  selected,
  setSelected,
}: Props) => {
  const formatNumber = (value: number) => {
    const formatUnit = [1000000000, 1000000, 1000];
    for (let i = 0; i < formatUnit.length; i++) {
      if (value !== 0 && value >= formatUnit[i]) {
        const unit = i === 0 ? 'B' : i === 1 ? 'M' : 'K';
        const numberAfterCom = String(value % formatUnit[i]).replaceAll(
          '0',
          '',
        ).length;
        return `${(value / formatUnit[i]).toFixed(
          numberAfterCom >= 2 ? 2 : numberAfterCom,
        )}${unit} `;
      }
    }
    return `${value} `;
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected();
      }}
      style={[
        styles.btnStyle,
        selected ? styles.btnSelected : styles.btnUnSelected,
      ]}>
      <Text
        style={[
          styles.txtStyle,
          selected ? styles.txtSelected : styles.txtUnSelected,
        ]}>{`${title}(${formatNumber(numberRate)})`}</Text>
    </TouchableOpacity>
  );
};

export default ButtonFilterRate;

const styles = StyleSheet.create({
  btnStyle: {
    borderRadius: 5,
    paddingVertical: '2%',
    paddingHorizontal: '1%',
    width: width * 0.22,
    alignItems: 'center',
    marginRight: '4%',
    marginTop: '3%',
  },
  txtStyle: {
    fontSize: 13,
    fontWeight: '600',
  },
  txtUnSelected: {
    color: '#878A9C',
  },
  txtSelected: {
    color: '#75A3C7',
  },
  btnUnSelected: {
    backgroundColor: '#F1F2F8',
    borderColor: '#F1F2F8',
    borderWidth: 1,
  },
  btnSelected: {
    borderColor: '#75A3C7',
    borderWidth: 1,
  },
});
