import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from 'react-native';
import {Badge} from 'react-native-paper';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';

interface Props {
  defaultTitle: string;
  title: string;
  setTitle: any;
  categories: Array<{
    value: string;
    isSelect: boolean;
  }>;
  setCategories: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        isSelect: boolean;
      }[]
    >
  >;
  hasImage?: boolean;
}

const VariationOption = (props: Props): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);
  const [isDeleted, setDeleted] = useState<boolean>(false);

  const {openModal} = useModal<ModalStackParamsList>();
  const {t} = useTranslation();

  const selectedItem = (index: any) => {
    const temp = [...props.categories];
    temp[index].isSelect = !temp[index].isSelect;
    props.setCategories(temp);
  };

  const deletedItem = (index: any) => {
    const temp = [...props.categories];
    temp.splice(index, 1);
    props.setCategories(temp);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      value: string;
      isSelect: boolean;
    };
    index: number;
  }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        if (edit) {
          openModal('AddVariationModal', {
            variation: props.categories,
            setVariation: props.setCategories,
            isEdit: true,
            variationValue: item.value,
            variationEditIndex: index,
          });
        } else {
          selectedItem(index);
        }
      }}>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <View
          style={[
            styles.variationItem,
            {
              borderColor: item.isSelect ? color.primary : color.grey6,
            },
          ]}>
          <Text style={{color: item.isSelect ? color.primary : color.grey6}}>
            {item.value}
          </Text>
        </View>
        {isDeleted && (
          <Badge
            style={{
              position: 'absolute',
              elevation: 4,
              zIndex: 4,
              top: -5,
              right: 0,
              backgroundColor: 'red',
            }}
            size={18}
            onPress={() => {
              deletedItem(index);
            }}>
            X
          </Badge>
        )}
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <View style={styles.boxWrapperTop}>
        <TextInput
          placeholder={props.defaultTitle}
          style={{color: '#000', padding: 0, flex: 1}}
          value={props.title}
          onChangeText={text => props.setTitle(text)}
          onSubmitEditing={() => {}}
          placeholderTextColor={color.grey9}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            setDeleted(!isDeleted);
            setEdit(!edit);
          }}>
          <Text style={{color: color.primary}}>
            {!edit
              ? `${t(i18nKeys.item.create.addVariation.edit)}`
              : `${t(i18nKeys.item.create.addVariation.done)}`}
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          paddingVertical: '1%',
          flexDirection: 'row',
        }}>
        <FlatList
          data={props.categories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                margin: 10,
                minWidth: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color.grey9}}>
                ({t(i18nKeys.item.create.addVariation.addVariationDescription)})
              </Text>
            </View>
          }
        />
        <TouchableWithoutFeedback
          onPress={() => {
            openModal('AddVariationModal', {
              variation: props.categories,
              setVariation: props.setCategories,
            });
          }}>
          <View style={{marginVertical: 10}}>
            <View
              style={[
                styles.variationItem,
                {
                  backgroundColor: color.blueDark1,
                  borderWidth: 0,
                },
              ]}>
              <Text style={{color: color.white}}>
                + {t(i18nKeys.item.create.addVariation.add)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 10,
    backgroundColor: color.blue7,
    borderRadius: 10,
  },

  boxWrapperTop: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },

  variationItem: {
    padding: 5,
    borderWidth: 1,
    marginHorizontal: 10,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },

  containerSwitchHasImg: {
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#eeeeee',
  },

  txtSwitchHasImg: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },

  hintSwitchHasImg: {fontSize: 12, fontWeight: '400', color: '#adb5bd'},
});

export default VariationOption;
