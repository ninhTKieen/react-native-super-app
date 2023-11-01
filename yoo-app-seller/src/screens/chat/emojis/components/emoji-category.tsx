import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Emoji from './emoji';
import {emojisByCategory} from '../data/emojis';
type Props = {
  category: string;
};
const EmojiCategory = ({category}: Props) => {
  return (
    <FlatList
      style={styles.container}
      data={emojisByCategory[category]}
      renderItem={({item}) => <Emoji item={item} />}
      keyExtractor={item => item}
      numColumns={8}
    />
  );
};

export default memo(EmojiCategory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
