import React, {useState, useRef, useEffect, RefObject} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import itemService from '@/features/item/item.service';
import {ItemCategoryNode} from '@/features/item/item.model';
import TopBar from '@/components/top-bar';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';
import {useController, useFormContext} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {
  createItemActions,
  selectedCategoryNodes,
  selectedCategory as currentCategory,
} from '@/features/item/item.slice';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {selectCurrentStoreInfor} from '@/features/store/store.slice';

const {width, height} = Dimensions.get('window');

const ListCategoryColumn = ({
  data,
  onPress,
}: {
  data: ItemCategoryNode[] | undefined;
  onPress: (chosenCategory: ItemCategoryNode) => void;
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {control, setValue} = useFormContext();
  const {field} = useController({
    control,
    name: 'categoryId',
  });

  return (
    <View style={styles.column}>
      {data?.map(item => (
        <TouchableOpacity
          onPress={() => {
            if (!item.data.hasChildren) {
              setValue('attributeList', []);
              if (item.data.id !== field.value) {
                dispatch(
                  createItemActions.setCategory({
                    id: item.data.id,
                    name: item.data.name,
                  }),
                );
                field.onChange(item.data.id);
              }
              onPress(item);
              navigation.goBack();
            } else {
              onPress(item);
            }
          }}
          key={item.data.id}>
          <View style={styles.categoryTitle}>
            <Text
              style={{
                color: field.value === item.data.id ? color.primary : '#000',
                fontSize: 15,
                lineHeight: 16,
                fontWeight: '400',
              }}>
              {item.data.name}
            </Text>
            {item.data.hasChildren && (
              <EvilIcon name="chevron-right" size={30} color="black" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ItemCategoryScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const categoryNodes = useAppSelector(selectedCategoryNodes);
  const category = useAppSelector(currentCategory);
  const currentStoreInfor = useAppSelector(selectCurrentStoreInfor);

  const {isLoading} = useQuery({
    queryKey: ['item-categories'],
    queryFn: () =>
      itemService.getCategories({
        businessType: currentStoreInfor.type,
      }),
    onSuccess: _data => {
      if (categoryNodes?.length) {
        setCurCategories(categoryNodes);
      } else {
        setCurCategories([
          {
            data: {} as ItemCategoryNode['data'],
            children: _data,
          },
        ]);
      }
    },
  });
  const [curCategories, setCurCategories] = useState<ItemCategoryNode[]>([]);
  const setContentVerticalOffset = useState<number>(0)[1];
  const carouselRef = useRef<ICarouselInstance>(null);
  const listRef: RefObject<ScrollView> = useRef(null);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (curCategories?.length) {
      const curIndex = curCategories.length - 1;
      carouselRef.current?.scrollTo({
        index: curIndex,
        animated: true,
      });
    }
  }, [curCategories]);

  return (
    <ScrollView
      ref={listRef}
      onScroll={event => {
        setContentVerticalOffset(event.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <TopBar title={t(i18nKeys.item.create.categoryTitle)} />
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <Text style={styles.title}>
          {t(i18nKeys.item.create.recentlySelected)}
        </Text>
      </View>

      <View style={styles.categoriesHistory}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {curCategories.length > 1 ? (
            <>
              {curCategories.slice(1)?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    carouselRef?.current?.scrollTo({
                      index: index,
                      animated: true,
                    });
                  }}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      color: color.primary,
                      fontWeight: '600',
                    }}>
                    {item.data.name}
                  </Text>
                  {index !== curCategories.length - 1 && (
                    <EvilIcon
                      name="chevron-right"
                      size={30}
                      color={color.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View style={{padding: 5}}>
              <Text
                style={{
                  color: color.primary,
                  fontWeight: '600',
                }}>
                {category?.name || t(i18nKeys.item.create.pleaseSelectCategory)}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={{minHeight: 500}}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          <Text style={styles.title}>
            {t(i18nKeys.item.create.allCategories)}
          </Text>
        </View>
        {!isLoading && curCategories.length > 0 && (
          <Carousel
            loop={false}
            width={width}
            height={height * 1.2}
            data={curCategories}
            scrollAnimationDuration={500}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            onSnapToItem={_index => {
              scrollToTop();
              setCurCategories(
                (oldCategories: ItemCategoryNode[] | undefined) => {
                  let newCategories = [
                    ...(oldCategories as ItemCategoryNode[]),
                  ];
                  newCategories = newCategories.slice(0, _index + 1);
                  return newCategories;
                },
              );
            }}
            ref={carouselRef}
            renderItem={({item, index}) => {
              return (
                <View>
                  <ListCategoryColumn
                    data={item.children}
                    onPress={chosenCategory => {
                      setCurCategories(
                        (oldCategories: ItemCategoryNode[] | undefined) => {
                          let newCategories = [
                            ...(oldCategories as ItemCategoryNode[]),
                          ];
                          newCategories = newCategories.slice(0, index + 1);
                          if (chosenCategory.data.hasChildren) {
                            newCategories.push(chosenCategory);
                          }
                          dispatch(
                            createItemActions.setCategoryNodes(newCategories),
                          );
                          return newCategories;
                        },
                      );
                      dispatch(
                        createItemActions.setCategoryNodes(curCategories),
                      );
                      scrollToTop();
                    }}
                  />
                </View>
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  categoriesHistory: {
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    width: width - 20,
    borderRadius: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    color: color.primary,
  },

  categoryTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
    height: 40,
  },

  column: {
    //make shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    minWidth: width - 20,
    borderRadius: 10,
  },
});

export default ItemCategoryScreen;
