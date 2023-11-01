import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import shortnameToUnicode from '../data/shortnameToUnicode';
type Props = {
  item: string;
};
const Emoji = ({item}: Props) => {
  return (
    <TouchableOpacity style={styles.emojiContainer}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  );
};

export default Emoji;

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: 9,
  },
  emoji: {
    fontSize: 25,
  },
});
