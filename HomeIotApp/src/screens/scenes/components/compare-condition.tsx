import { colors } from '@src/configs/constant/global-styles';
import { ESceneConditionCompare } from '@src/features/scenes/scene.model';
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Surface } from 'react-native-paper';

type TCompareConditionProps = {
  currentValue: any;
  onChange: (value: any) => void;
};

const CompareCondition = (props: TCompareConditionProps) => {
  const { height } = useWindowDimensions();

  const data = [
    {
      value: ESceneConditionCompare.EQUAL,
      label: '=',
    },
    {
      value: ESceneConditionCompare.NOT_EQUAL,
      label: '!=',
    },
    {
      value: ESceneConditionCompare.GREATER_THAN,
      label: '>',
    },
    {
      value: ESceneConditionCompare.GREATER_THAN_OR_EQUAL,
      label: '>=',
    },
    {
      value: ESceneConditionCompare.LESS_THAN,
      label: '<',
    },
    {
      value: ESceneConditionCompare.LESS_THAN_OR_EQUAL,
      label: '<=',
    },
  ];

  return (
    <Surface
      style={{
        backgroundColor: colors.white,
        margin: 10,
        borderRadius: 10,
      }}
    >
      <View style={{ overflow: 'hidden', borderRadius: 10 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.value}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                //   setCurrentValue(item.value);
                props.onChange(item.value);
              }}
              style={{
                width: `${100 / 3}%`,
                height: height / 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  item.value === props.currentValue
                    ? colors.primary
                    : colors.transparent,
              }}
            >
              <Text
                style={{
                  color:
                    item.value === props.currentValue
                      ? colors.white
                      : colors.black,
                  fontSize: 16,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Surface>
  );
};

export default CompareCondition;
