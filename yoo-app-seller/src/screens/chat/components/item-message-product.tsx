import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ImageCustomer from '@/components/common/image-customer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainBottomTabParamList} from '@/routes';
const {width, height} = Dimensions.get('screen');
const ItemMessageProduct = ({item}: any) => {
  const InforProduct = JSON.parse(item?.message) ?? {};
  const navigation = useNavigation<NavigationProp<MainBottomTabParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (InforProduct && InforProduct.id) {
          navigation.navigate('Home', {
            screen: 'ItemStack',
            params: {
              screen: 'ItemDetail',
              params: {
                item: InforProduct,
              },
            },
          });
        }
      }}>
      {InforProduct.imageUrlList && InforProduct.imageUrlList[0] && (
        <ImageCustomer
          source={{uri: InforProduct.imageUrlList[0]}}
          widthImg={width * 0.15}
          heightImg={width * 0.15}
          style={{
            width: width * 0.15,
            aspectRatio: 1,
          }}
        />
      )}
      <View style={{justifyContent: 'space-around'}}>
        <Text style={styles.txtName}>{InforProduct?.name}</Text>
        <Text style={styles.txtPrice}>
          {Intl.NumberFormat('vi', {
            style: 'currency',
            currency: 'VND',
          }).format(InforProduct.modelList[0]?.currentPrice ?? 0)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemMessageProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.07,
    borderRadius: 10,
  },
  txtName: {
    color: '#878A9C',
    fontSize: 16,
    fontWeight: '600',
  },
  txtPrice: {
    color: '#75A3C7',
    fontSize: 17,
    fontWeight: '700',
  },
});
