import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const TabBar = ({navigationState, position, setIndex}) => {
  const inputRange = navigationState.routes.map((x, i) => i);
  return (
    <View style={styles.container}>
      {navigationState.routes.map((route, index) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex =>
            inputIndex === index ? 1 : 0.5,
          ),
        });
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => setIndex(index)}>
            <Animated.Text style={{opacity, fontSize: 18}}>
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
});
