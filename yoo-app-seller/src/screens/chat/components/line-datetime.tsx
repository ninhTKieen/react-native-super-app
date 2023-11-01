import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
const {width, height} = Dimensions.get('screen');

const LineDatetime = ({time}: {time: string}) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.lineLeft} /> */}
      <View style={styles.containerContent}>
        <Text style={styles.txtContent}>
          {moment(time).format('DD - MMMM')}
        </Text>
      </View>
      {/* <View style={styles.lineRight} /> */}
    </View>
  );
};

export default LineDatetime;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lineLeft: {
    backgroundColor: '#ced4da',
    height: 0.5,
    width: width * 0.33,
    marginHorizontal: width * 0.02,
  },
  lineRight: {
    backgroundColor: '#ced4da',
    height: 0.5,
    width: width * 0.33,
    marginHorizontal: width * 0.02,
  },
  txtContent: {color: '#ffffff', fontWeight: '400', fontSize: 11.5},
  containerContent: {
    backgroundColor: '#adb5bd',
    paddingVertical: '0.75%',
    paddingHorizontal: '1.5%',
    borderRadius: width * 0.1,
  },
});
