import ImageCustomer from '@/components/common/image-customer';
import {IMessage} from '@/features/chat/chat.model';
import React, {useState, useEffect} from 'react';
import {View, Pressable, Dimensions, Vibration, Platform} from 'react-native';
const {width} = Dimensions.get('window');

export default function ListMediaChat({
  mess,
  setImgOverlay,
}: {
  mess: IMessage;
  setImgOverlay: Function;
}) {
  const [listImg, setListImg] = useState([]);
  useEffect(() => {
    if (mess.message && JSON.parse(mess.message).length) {
      setListImg(JSON.parse(mess.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: mess.side === 1 ? 'flex-end' : 'flex-start',
      }}>
      {listImg.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              setImgOverlay({
                visible: true,
                type: 1,
                uri: item,
              });
            }}
            onLongPress={() => {
              if (Platform.OS === 'ios') {
                Vibration.vibrate([100]);
              } else {
                Vibration.vibrate(100);
              }
              setImgOverlay({
                visible: true,
                type: 2,
                uri: item,
              });
            }}>
            <ImageCustomer
              source={{uri: item}}
              widthImg={width * 0.26}
              heightImg={width * 0.26}
              style={{
                width: width * 0.26,
                height: width * 0.26,
                borderTopLeftRadius: index === 0 ? 16 : 0,
                borderTopRightRadius:
                  (listImg.length > 2 && index === 2) ||
                  (listImg.length <= 2 && index === 1)
                    ? 16
                    : 0,
                borderBottomLeftRadius:
                  (listImg.length % 3 ? listImg.length % 3 : 3) + index ===
                    listImg.length ||
                  (mess.side === 1 &&
                    listImg.length - (listImg.length % 3) - 3 === index)
                    ? 16
                    : 0,
                borderBottomRightRadius:
                  index + 1 === listImg.length ||
                  (listImg.length % 3 !== 0 &&
                    listImg.length - (listImg.length % 3) - 1 === index)
                    ? 16
                    : 0,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
