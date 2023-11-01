import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {
  title: string;
  iconRight?: any;
  iconLeft?: any;
}

const MainTabTitle: React.FC<IProps> = props => {
  const {title, iconRight, iconLeft} = props;
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            maxWidth: '70%',
            overflow: 'hidden',
            height: '100%',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          {iconLeft ? iconLeft : null}
          <View style={{}}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingRight: 10}}>
          {iconRight ? iconRight : null}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    height: 60,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#333333',
  },

  tabTitleIcon: {
    marginHorizontal: 4,
  },
});

export default MainTabTitle;
