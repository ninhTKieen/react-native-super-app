import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {memo, useState} from 'react';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import categories from '../data/categories';
import EmojiCategory from './emoji-category';
import TabBar from './tab-bar';
type propsScence = {
  route: {
    key: string;
    title: string;
  };
};
const EmojiPicker = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState(
    categories.tabs.map(tab => ({key: tab.category, title: tab.tabLabel})),
  );
  const renderScence = ({route}: SceneRendererProps & propsScence) => (
    <EmojiCategory category={route.key} />
  );
  return (
    <TabView
      renderTabBar={props => <TabBar {...props} setIndex={setIndex} />}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScence}
      initialLayout={{width: layout.width}}
    />
  );
};

export default memo(EmojiPicker);

const styles = StyleSheet.create({});
