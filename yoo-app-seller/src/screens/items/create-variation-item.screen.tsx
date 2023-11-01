import React, {useState} from 'react';

import {View, KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
import VariationOption from './components/variation/option';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useController, useFormContext} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import TopBar from '@/components/top-bar';
import {ItemStackParamList} from '@/routes/item.route';
import {IDefaultModelList} from '@/features/item/item.model';
import {color} from '@/configs/globalStyles';

const CreateVariationScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<ItemStackParamList>>();
  const {t} = useTranslation();

  const {control} = useFormContext();

  const {field} = useController({
    name: 'tierVariationList',
    control,
  });

  const [firstVarName, setFirstVarName] = useState<string>(
    field.value?.[0]?.name || '',
  );
  const [secondVarName, setSecondVarName] = useState<string>(
    field.value?.[1]?.name || '',
  );
  const [firstVariation, setFirstVariation] = useState<
    Array<{
      value: string;
      isSelect: boolean;
    }>
  >(
    field.value?.[0]?.optionList.map((item: string) => {
      return {
        value: item,
        isSelect: true,
      };
    }) || [],
  );
  const [secondVariation, setSecondVariation] = useState<
    Array<{
      value: string;
      isSelect: boolean;
    }>
  >(
    field.value?.[1]?.optionList.map((item: string) => {
      return {
        value: item,
        isSelect: true,
      };
    }) || [],
  );

  const checkingForNextStep = () => {
    if (
      (firstVarName === '' ||
        !firstVariation.filter((item: any) => item.isSelect).length) &&
      (secondVarName === '' ||
        !secondVariation.filter((item: any) => item.isSelect).length)
    ) {
      return true;
    } else if (
      firstVariation.filter((item: any) => item.isSelect).length &&
      secondVariation.filter((item: any) => item.isSelect).length &&
      (firstVarName === '' || secondVarName === '')
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnPress = () => {
    const selectedFirstVar = firstVariation
      .filter((item: any) => item.isSelect)
      .map((item: any) => item.value);
    const selectedSecondVar = secondVariation
      .filter((item: any) => item.isSelect)
      .map((item: any) => item.value);
    let res = [];
    if (selectedFirstVar.length) {
      res.push({
        name: firstVarName,
        optionList: selectedFirstVar,
      });
    }
    if (selectedSecondVar.length) {
      res.push({
        name: secondVarName,
        optionList: selectedSecondVar,
      });
    }

    field.onChange(res);

    const defaultModelList: Array<IDefaultModelList> = [];
    //check if there is any selected variation is empty

    if (!selectedFirstVar.length || !selectedSecondVar.length) {
      // choose one of the variation which is not empty
      const selectedVar = selectedFirstVar.length
        ? selectedFirstVar
        : selectedSecondVar;
      selectedVar.forEach((_varItem: string, varIndex: number) => {
        defaultModelList.push({
          originalPrice: 10000,
          currentPrice: 9000,
          stock: '0',
          tierIndex: [varIndex],
          sku: 'yoo',
          imageUrl: '',
        });
      });
    } else {
      selectedFirstVar.forEach((_firstVar: string, firstVarIndex: number) => {
        selectedSecondVar.forEach(
          (secondVar: string, secondVarIndex: number) => {
            defaultModelList.push({
              originalPrice: 10000,
              currentPrice: 9000,
              stock: '0',
              tierIndex: [firstVarIndex, secondVarIndex],
              sku: 'yoo',
              imageUrl: '',
            });
          },
        );
      });
    }

    navigation.navigate('ItemVariantInfo', {
      defaultModelList,
      tierVariationList: res,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TopBar title={t(i18nKeys.item.create.variationsTitle)} />
      <VariationOption
        defaultTitle={t(i18nKeys.item.create.addVariation.groupNameTitle)}
        title={firstVarName}
        setTitle={setFirstVarName}
        categories={firstVariation}
        setCategories={setFirstVariation}
      />

      <VariationOption
        defaultTitle={t(i18nKeys.item.create.addVariation.groupNameTitle)}
        title={secondVarName}
        setTitle={setSecondVarName}
        categories={secondVariation}
        setCategories={setSecondVariation}
      />

      <View style={{marginTop: 'auto', flexDirection: 'row'}}>
        <View style={{flex: 1.5}}>
          <Button
            mode="outlined"
            style={{margin: 20, borderRadius: 30, borderColor: color.primary}}
            textColor={color.primary}
            onPress={() => {
              field.onChange([]);
              navigation.goBack();
            }}>
            {t(i18nKeys.item.create.addVariation.cancel)}
          </Button>
        </View>

        <View style={{flex: 1.5}}>
          <Button
            mode="contained"
            buttonColor={color.primary}
            style={{margin: 20, borderRadius: 30}}
            disabled={checkingForNextStep()}
            onPress={handleOnPress}>
            {t(i18nKeys.item.create.addVariation.next)}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default CreateVariationScreen;
