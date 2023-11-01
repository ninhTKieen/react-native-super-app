import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const {width, height} = Dimensions.get('screen');

type Props = {
  mess: any;
  setReplyMess?: Function;
  setPinMess?: Function;
  deleteMess?: Function;
  setEmotionVisible?: Function;
};
const TooltipMessage = ({
  mess,
  setReplyMess = () => {},
  setPinMess = () => {},
  deleteMess = () => {},
  setEmotionVisible = () => {},
}: Props) => {
  const contentToolTip = [
    {
      icon: 'message-reply',
      name: 'Trả lời',
      size: 26,
    },
    {
      icon: 'pin',
      name: 'Ghim',
      size: 28,
    },
    {
      icon: 'delete',
      name: 'Thu hồi',
      size: 28,
    },
    {
      icon: 'reply',
      name: 'Chuyển tiếp',
      size: 28,
    },
    {
      icon: 'content-copy',
      name: 'Sao chép',
      size: 28,
    },
  ];
  return (
    <View
      style={{
        borderRadius: width * 0.02,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.015,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
      }}>
      {contentToolTip.map((item, index) => {
        return mess?.side === 2 && index === 2 ? null : (
          <TouchableOpacity
            style={styles.btnChangeMess}
            key={index}
            onPress={() => {
              if (mess?.message) {
                switch (index) {
                  case 0:
                    // setReplyMess(mess);
                    Toast.show({
                      text1: 'Comming soon',
                      text2: 'Tính năng đang phát triển',
                      visibilityTime: 1000,
                    });
                    break;
                  case 1:
                    // setPinMess(mess);
                    Toast.show({
                      text1: 'Comming soon',
                      text2: 'Tính năng đang phát triển',
                      visibilityTime: 1000,
                    });
                    break;
                  case 2:
                    deleteMess(mess);
                    break;
                  case 3:
                    Toast.show({
                      text1: 'Comming soon',
                      text2: 'Tính năng đang phát triển',
                      visibilityTime: 1000,
                    });
                    break;
                  case 4:
                    if (mess.message) {
                      Clipboard.setString(mess.message);
                    }
                    break;
                  default:
                    break;
                }
                setEmotionVisible();
              }
            }}>
            <MaterialCommunityIcons
              name={item.icon}
              size={item.size}
              color="#339FD9"
            />
            <Text style={styles.txtChangeMess}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TooltipMessage;

const styles = StyleSheet.create({
  btnChangeMess: {
    paddingVertical: width * 0.02,
    width: width * 0.26,
    alignItems: 'center',
  },
  txtChangeMess: {
    fontWeight: '500',
    color: '#2B5783',
    fontSize: 12,
  },
  containerEmotion: {
    backgroundColor: 'white',
    marginBottom: height * 0.01,
    padding: width * 0.03,
    borderRadius: width * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
