import {Text, TouchableOpacity, Platform, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import {ChatStackParamList} from '@/routes/chat.route';
const {width, height} = Dimensions.get('screen');
type PropsHeaderSearch = {
  isTextInput?: boolean;
  submitSearch?: Function;
};

const HeaderSearch = ({
  isTextInput = false,
  submitSearch = () => {},
}: PropsHeaderSearch) => {
  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();
  const navigationSearch = () => {
    navigation.navigate('SearchCustomerChatScreen');
  };
  const [valueSearch, setValueSearch] = useState('');
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#fff', '#fff']}
      style={{
        flexDirection: 'row',
        paddingLeft: '4%',
        alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          borderRadius: width,
          backgroundColor: 'rgba(183, 212, 255, 0.2)',
          width: width * 0.07,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#C4C8D9',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="ios-chevron-back-outline" color={'#878A9C'} size={24} />
      </TouchableOpacity>
      {isTextInput ? (
        <Searchbar
          autoFocus={true}
          placeholder="Nhập thông tin tìm kiếm"
          placeholderTextColor={'#adb5bd'}
          value={valueSearch}
          onChangeText={setValueSearch}
          onEndEditing={e => {
            submitSearch(e.nativeEvent.text);
          }}
          elevation={0}
          iconColor={'#adb5bd'}
          selectionColor={'#adb5bd'}
          style={{
            backgroundColor: '#F1F2F8',
            height: height * 0.042,
            width: width * 0.81,
            marginHorizontal: width * 0.04,
            paddingLeft: 0,
            borderRadius: width * 0.4,
          }}
          inputStyle={{
            paddingLeft: 0,
            fontSize: 15,
            fontWeight: '600',
            color: '#C4C8D9',
            marginVertical: -10,
          }}
          onClearIconPress={() => {
            submitSearch(undefined);
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={navigationSearch}
          style={{
            paddingVertical: height * 0.012,
            marginHorizontal: width * 0.04,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F1F2F8',
            borderRadius: width * 0.4,
          }}>
          {/* <Icon
            name="ios-search-outline"
            type="ionicon"
            color={'#fff'}
            size={24}
            style={{
              paddingLeft: 8,
            }}
          /> */}
          <Text
            style={{
              paddingLeft: width * 0.02,
              fontSize: 15,
              fontWeight: '600',
              color: '#C4C8D9',
            }}>
            Tìm kiếm
          </Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default HeaderSearch;
