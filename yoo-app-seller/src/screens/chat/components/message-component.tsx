// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableWithoutFeedback,
//   Pressable,
//   Platform,
//   Vibration,
//   Dimensions,
//   Linking,
//   ScrollView,
// } from 'react-native';
// import React, {useState} from 'react';
// import Tooltip from 'react-native-walkthrough-tooltip';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Modal from 'react-native-modal';
// import moment from 'moment';
// import {IMessage} from '@/features/chat/chat.model';
// import TooltipMessage from './tooltip-message';
// import ImgChat from './img-chat';
// import ListMediaChat from './list-media-chat';
// import ImageViewer from 'react-native-image-zoom-viewer';
// import FastImage from 'react-native-fast-image';
// import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// const {width, height} = Dimensions.get('screen');
// type Props = {
//   mess: IMessage;
//   emotionDisable: boolean;
//   deleteMess: Function;
// };
// const MessageComponent = ({
//   mess,
//   emotionDisable = false,
//   deleteMess = () => {},
// }: Props) => {
//   const [emotionVisible, setEmotionVisible] = useState(false);
//   const [positionVisible, setPositionVisible] = useState(false);
//   const insets = useSafeAreaInsets();
//   const [imgOverlay, setImgOverlay] = useState({
//     visible: false,
//     type: 1,
//     uri: '',
//   });

//   const getArrayUrl = () => {
//     if (mess.typeMessage === 5 || mess.typeMessage === 6) {
//       const imgs = JSON.parse(mess.message);
//       let imgUrls: any = [];
//       imgs.forEach((val: string, _index: number) => {
//         imgUrls.push({
//           url: val,
//         });
//       });

//       return imgUrls;
//     } else {
//       return [];
//     }
//   };
//   const getIndexImgOverlay = () => {
//     if (imgOverlay.uri !== '') {
//       const imgs = JSON.parse(mess.message);
//       return imgs.indexOf(imgOverlay.uri);
//     }
//   };
//   return (
//     <View style={{flex: 1}}>
//       <Tooltip
//         isVisible={emotionVisible}
//         showChildInTooltip={mess.typeMessage !== 2 && mess.typeMessage !== 5}
//         contentStyle={{
//           backgroundColor: 'transparent',
//         }}
//         content={
//           <View>
//             <TooltipMessage
//               deleteMess={deleteMess}
//               mess={mess}
//               setEmotionVisible={() => {
//                 setEmotionVisible(!emotionVisible);
//               }}
//             />
//           </View>
//         }
//         arrowSize={{
//           height: 0,
//           width: 16,
//         }}
//         disableShadow={false}
//         placement={positionVisible ? 'top' : 'bottom'}
//         onClose={() => setEmotionVisible(false)}>
//         {mess.typeMessage === 2 || mess.typeMessage === 5 ? (
//           <Pressable
//             onPress={() => {
//               if (mess.typeMessage === 2 || mess.typeMessage === 3) {
//                 setImgOverlay({
//                   visible: true,
//                   type: 1,
//                   uri: mess.message,
//                 });
//               }
//             }}
//             onLongPress={_event => {
//               if (mess.typeMessage === 2 || mess.typeMessage === 3) {
//                 if (Platform.OS === 'ios') {
//                   Vibration.vibrate([100]);
//                 } else {
//                   Vibration.vibrate(100);
//                 }
//                 setImgOverlay({
//                   visible: true,
//                   type: 2,
//                   uri: mess.message,
//                 });
//               }
//             }}
//             style={{
//               padding: 10,
//               marginVertical: 5,
//               alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
//               maxWidth: '100%',
//             }}>
//             {mess.typeMessage === 2 ? (
//               <ImgChat mess={mess.message} overlayReview={false} />
//             ) : (
//               <ListMediaChat mess={mess} setImgOverlay={setImgOverlay} />
//             )}
//             <Text
//               style={{
//                 fontSize: 11,
//                 color: 'rgba(0,0,0,0.7)',
//                 paddingRight: mess.side === 1 ? 10 : 0,
//                 alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
//               }}>
//               {moment(mess.creationTime).format('HH:mm')}
//             </Text>
//           </Pressable>
//         ) : mess.typeMessage === 4 ? (
//           <Pressable
//             onLongPress={event => {
//               if (!emotionDisable) {
//                 if (Platform.OS === 'ios') {
//                   Vibration.vibrate([100]);
//                 } else {
//                   Vibration.vibrate(100);
//                 }
//                 if (event.nativeEvent.pageY > 500) {
//                   setPositionVisible(true);
//                 }
//                 if (event.nativeEvent.pageY < 380) {
//                   setPositionVisible(false);
//                 }
//                 setEmotionVisible(true);
//               }
//             }}
//             onPress={() => {
//               Linking.openURL(mess.message);
//             }}>
//             <View
//               style={[
//                 {
//                   backgroundColor: '#dedede',
//                   padding: 10,
//                   marginVertical: 5,
//                   alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
//                   maxWidth: '70%',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   borderRadius: 10,
//                   marginHorizontal: '3%',
//                 },
//               ]}>
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   width: width * 0.1,
//                   aspectRatio: 1,
//                   backgroundColor: '#adb5bd',
//                   borderRadius: width * 0.1,
//                   marginRight: 5,
//                 }}>
//                 <Ionicons name="document-text" color={'#333333'} size={20} />
//               </View>
//               <Text
//                 style={{
//                   fontSize: 13,
//                   color: '#333333',
//                   fontWeight: '300',
//                   maxWidth: '80%',
//                 }}>
//                 {mess.message.substring(mess.message.lastIndexOf('/') + 1)}
//               </Text>
//             </View>
//             <Text
//               style={{
//                 fontSize: 11,
//                 color: 'rgba(0,0,0,0.7)',
//                 paddingRight: mess.side === 1 ? 10 : 0,
//                 alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
//                 marginRight: mess.side === 1 ? '5%' : 0,
//                 marginLeft: mess.side === 1 ? 0 : '5%',
//               }}>
//               {moment(mess.creationTime).format('HH:mm')}
//             </Text>
//           </Pressable>
//         ) : (
//           <Pressable
//             style={mess.side === 1 ? styles.mesSend : styles.mesRecv}
//             onLongPress={event => {
//               if (!emotionDisable) {
//                 if (Platform.OS === 'ios') {
//                   Vibration.vibrate([100]);
//                 } else {
//                   Vibration.vibrate(100);
//                 }
//                 if (event.nativeEvent.pageY > 500) {
//                   setPositionVisible(true);
//                 }
//                 if (event.nativeEvent.pageY < 380) {
//                   setPositionVisible(false);
//                 }
//                 setEmotionVisible(true);
//               }
//             }}>
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: mess.side === 1 ? '#ffffff' : '#333333',
//                 alignSelf: mess.side === 1 ? 'flex-start' : 'flex-end',
//               }}>
//               {mess.message}
//             </Text>
//             <Text
//               style={{
//                 fontSize: 11,
//                 color:
//                   mess.side === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
//                 alignSelf: mess.side === 1 ? 'flex-start' : 'flex-end',
//               }}>
//               {moment(mess.creationTime).format('HH:mm')}
//             </Text>
//           </Pressable>
//         )}
//       </Tooltip>
//       {mess.readState === 0 && mess.id === null ? (
//         <View
//           style={{
//             flexDirection: 'row',
//             alignSelf: 'flex-end',
//             marginHorizontal: width * 0.05,
//             alignItems: 'center',
//             borderRadius: width * 0.1,
//             borderWidth: 1,
//             borderColor: '#339FD9',
//             paddingVertical: height * 0.001,
//             paddingHorizontal: width * 0.01,
//           }}>
//           <MaterialCommunityIcons
//             name="send-clock-outline"
//             color="#339FD9"
//             size={16}
//           />
//           <Text
//             style={{
//               color: '#339FD9',
//               fontSize: 11,
//               fontWeight: '500',
//               paddingLeft: width * 0.01,
//             }}>
//             Đang gửi
//           </Text>
//         </View>
//       ) : null}
//       <Modal
//         style={{
//           marginHorizontal: 0,
//         }}
//         isVisible={imgOverlay.visible}
//         presentationStyle="overFullScreen"
//         animationIn={'fadeInUpBig'}>
//         <SafeAreaView
//           style={{
//             height: height,
//             paddingTop: Math.max(insets.top, 0),
//           }}
//           edges={['top']}>
//           {imgOverlay.type === 1 ? (
//             <View style={{flex: 1}}>
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: height * 0.01,
//                   left: width * 0.02,
//                   zIndex: 10,
//                 }}>
//                 <Ionicons
//                   name="close-circle-sharp"
//                   color={'#fff'}
//                   size={32}
//                   onPress={() => {
//                     setImgOverlay({
//                       visible: false,
//                       type: 1,
//                       uri: '',
//                     });
//                   }}
//                 />
//               </View>
//               {mess.typeMessage === 2 || mess.typeMessage === 3 ? (
//                 <ImageViewer
//                   renderImage={props => {
//                     // const check = props.style.width
//                     //   ? height / width >= props.style.height / props.style.width
//                     //   : null;

//                     return (
//                       <FastImage
//                         source={{uri: props.source.uri}}
//                         // style={{
//                         //   width: check
//                         //     ? width
//                         //     : props.style.height
//                         //     ? (width * height) / props.style.height
//                         //     : 0,
//                         //   height: check
//                         //     ? (width * props.style.height) / props.style.width
//                         //     : height,
//                         // }}
//                         style={{
//                           width: props.style.width ?? width,
//                           height: props.style.height ?? height,
//                         }}
//                       />
//                     );
//                   }}
//                   imageUrls={[{url: imgOverlay.uri}]}
//                   enableImageZoom={true}
//                 />
//               ) : (
//                 <ImageViewer
//                   imageUrls={getArrayUrl()}
//                   renderImage={props => {
//                     // const check = props.style.width
//                     //   ? height / width >= props.style.height / props.style.width
//                     //   : null;
//                     return (
//                       <FastImage
//                         source={{
//                           uri: props.source.uri,
//                         }}
//                         // style={{
//                         //   width: check
//                         //     ? width
//                         //     : props.style.height
//                         //     ? (width * height) / props.style.height
//                         //     : 0,
//                         //   height: check
//                         //     ? (width * props.style.height) / props.style.width
//                         //     : height,
//                         // }}
//                         style={{
//                           width: props.style.width ?? width,
//                           height: props.style.height ?? height,
//                         }}
//                       />
//                     );
//                   }}
//                   enableImageZoom={true}
//                   index={getIndexImgOverlay()}
//                 />
//               )}
//             </View>
//           ) : (
//             <Pressable
//               onPress={() => {
//                 setImgOverlay({
//                   visible: false,
//                   type: 1,
//                   uri: '',
//                 });
//               }}
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 paddingHorizontal: width * 0.05,
//               }}>
//               <TouchableWithoutFeedback>
//                 <>
//                   <View
//                     style={{
//                       alignItems: mess.side === 1 ? 'flex-end' : 'flex-start',
//                       width: '100%',
//                       paddingBottom: height * 0.01,
//                     }}>
//                     <ImgChat mess={imgOverlay.uri} overlayReview={false} />
//                   </View>

//                   <TooltipMessage
//                     mess={mess}
//                     deleteMess={deleteMess}
//                     setEmotionVisible={() => {
//                       setImgOverlay({
//                         visible: false,
//                         type: 1,
//                         uri: '',
//                       });
//                     }}
//                   />
//                 </>
//               </TouchableWithoutFeedback>
//             </Pressable>
//           )}
//         </SafeAreaView>
//       </Modal>
//     </View>
//   );
// };

// export default MessageComponent;

// const styles = StyleSheet.create({
//   mesSend: {
//     backgroundColor: '#0078fe',
//     padding: 10,
//     marginBottom: 5,
//     marginTop: 5,
//     marginRight: '2.5%',
//     alignSelf: 'flex-end',
//     maxWidth: '70%',
//     // borderRadius: 20,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     borderBottomLeftRadius: 16,
//     minWidth: '15%',
//   },
//   mesRecv: {
//     backgroundColor: '#dedede',
//     padding: 10,
//     marginTop: 5,
//     marginLeft: '1.5%',
//     alignSelf: 'flex-start',
//     maxWidth: '70%',
//     alignItems: 'center',
//     // borderRadius: 20,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     borderBottomRightRadius: 16,
//     minWidth: '15%',
//   },
// });

//===============================================================================================================
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
  Vibration,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import moment from 'moment';
import {IMessage} from '@/features/chat/chat.model';
import TooltipMessage from './tooltip-message';
import ImgChat from './img-chat';
import ListMediaChat from './list-media-chat';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Menu} from 'react-native-paper';
import Video from 'react-native-video';
import VideoComponent from './video-component';
import OverlayVideo from './overlay-video';
const {width, height} = Dimensions.get('screen');
type Props = {
  mess: IMessage;
  emotionDisable: boolean;
  deleteMess: Function;
};
const MessageComponent = ({
  mess,
  emotionDisable = false,
  deleteMess = () => {},
}: Props) => {
  const [emotionVisible, setEmotionVisible] = useState(false);
  const [positionVisible, setPositionVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const [imgOverlay, setImgOverlay] = useState({
    visible: false,
    type: 1,
    uri: '',
  });

  const getArrayUrl = () => {
    if (mess.typeMessage === 5 || mess.typeMessage === 6) {
      const imgs = JSON.parse(mess.message);
      let imgUrls: any = [];
      imgs.forEach((val: string, _index: number) => {
        imgUrls.push({
          url: val,
        });
      });

      return imgUrls;
    } else {
      return [];
    }
  };
  const getIndexImgOverlay = () => {
    if (imgOverlay.uri !== '') {
      const imgs = JSON.parse(mess.message);
      return imgs.indexOf(imgOverlay.uri);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: mess.side === 1 ? 'flex-end' : 'flex-start',
      }}>
      <Menu
        visible={emotionVisible}
        onDismiss={() => setEmotionVisible(false)}
        anchor={
          mess.typeMessage === 2 || mess.typeMessage === 5 ? (
            <Pressable
              onPress={() => {
                if (mess.typeMessage === 2) {
                  setImgOverlay({
                    visible: true,
                    type: 1,
                    uri: mess.message,
                  });
                }
              }}
              onLongPress={_event => {
                if (mess.typeMessage === 2) {
                  if (Platform.OS === 'ios') {
                    Vibration.vibrate([100]);
                  } else {
                    Vibration.vibrate(100);
                  }
                  setImgOverlay({
                    visible: true,
                    type: 2,
                    uri: mess.message,
                  });
                }
              }}
              style={{
                padding: 10,
                marginVertical: 5,
                alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                maxWidth: '100%',
              }}>
              {mess.typeMessage === 2 ? (
                <ImgChat mess={mess.message} overlayReview={false} />
              ) : (
                <ListMediaChat mess={mess} setImgOverlay={setImgOverlay} />
              )}
              <Text
                style={{
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.7)',
                  paddingRight: mess.side === 1 ? 10 : 0,
                  alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                }}>
                {moment(mess.creationTime).format('HH:mm')}
              </Text>
            </Pressable>
          ) : mess.typeMessage === 4 ? (
            <Pressable
              onLongPress={event => {
                if (!emotionDisable) {
                  if (Platform.OS === 'ios') {
                    Vibration.vibrate([100]);
                  } else {
                    Vibration.vibrate(100);
                  }
                  if (event.nativeEvent.pageY > 500) {
                    setPositionVisible(true);
                  }
                  if (event.nativeEvent.pageY < 380) {
                    setPositionVisible(false);
                  }
                  setEmotionVisible(true);
                }
              }}
              onPress={() => {
                Linking.openURL(mess.message);
              }}>
              <View
                style={[
                  {
                    backgroundColor: '#dedede',
                    padding: 10,
                    marginVertical: 5,
                    alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: '3%',
                  },
                ]}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width * 0.1,
                    aspectRatio: 1,
                    backgroundColor: '#adb5bd',
                    borderRadius: width * 0.1,
                    marginRight: 5,
                  }}>
                  <Ionicons name="document-text" color={'#333333'} size={20} />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#333333',
                    fontWeight: '300',
                    maxWidth: '80%',
                  }}>
                  {mess?.message?.substring(mess.message.lastIndexOf('/') + 1)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.7)',
                  paddingRight: mess.side === 1 ? 10 : 0,
                  alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                  marginRight: mess.side === 1 ? '5%' : 0,
                  marginLeft: mess.side === 1 ? 0 : '5%',
                }}>
                {moment(mess.creationTime).format('HH:mm')}
              </Text>
            </Pressable>
          ) : mess.typeMessage === 3 ? (
            <VideoComponent
              uri={mess.message.replaceAll('"', '')}
              onPress={() => {
                if (mess.typeMessage === 3) {
                  setImgOverlay({
                    visible: true,
                    type: 1,
                    uri: mess.message,
                  });
                }
              }}
              onLongPress={() => {
                if (mess.typeMessage === 3) {
                  if (Platform.OS === 'ios') {
                    Vibration.vibrate([100]);
                  } else {
                    Vibration.vibrate(100);
                  }
                  setImgOverlay({
                    visible: true,
                    type: 2,
                    uri: mess.message,
                  });
                }
              }}
            />
          ) : (
            <Pressable
              style={[
                mess.side === 1 ? styles.mesSend : styles.mesRecv,
                styles.mess,
              ]}
              onLongPress={event => {
                if (!emotionDisable) {
                  if (Platform.OS === 'ios') {
                    Vibration.vibrate([100]);
                  } else {
                    Vibration.vibrate(100);
                  }
                  if (event.nativeEvent.pageY > 500) {
                    setPositionVisible(true);
                  }
                  if (event.nativeEvent.pageY < 380) {
                    setPositionVisible(false);
                  }
                  setEmotionVisible(true);
                }
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: mess.side === 1 ? '#ffffff' : '#333333',
                  alignSelf: mess.side === 1 ? 'flex-start' : 'flex-end',
                }}>
                {mess.message}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color:
                    mess.side === 1
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(0,0,0,0.7)',
                  alignSelf: mess.side === 1 ? 'flex-start' : 'flex-end',
                }}>
                {moment(mess.creationTime).format('HH:mm')}
              </Text>
            </Pressable>
          )
        }
        anchorPosition="bottom"
        contentStyle={{
          backgroundColor: 'white',
          borderRadius: 8,
        }}>
        <View style={{width: width * 0.83}}>
          <TooltipMessage
            deleteMess={deleteMess}
            mess={mess}
            setEmotionVisible={() => {
              setEmotionVisible(!emotionVisible);
            }}
          />
        </View>
      </Menu>
      {mess.readState === 0 && mess.id === null ? (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginHorizontal: width * 0.05,
            alignItems: 'center',
            borderRadius: width * 0.1,
            borderWidth: 1,
            borderColor: '#339FD9',
            paddingVertical: height * 0.001,
            paddingHorizontal: width * 0.01,
          }}>
          <MaterialCommunityIcons
            name="send-clock-outline"
            color="#339FD9"
            size={16}
          />
          <Text
            style={{
              color: '#339FD9',
              fontSize: 11,
              fontWeight: '500',
              paddingLeft: width * 0.01,
            }}>
            Đang gửi
          </Text>
        </View>
      ) : null}
      <Modal
        style={{
          marginHorizontal: 0,
        }}
        isVisible={imgOverlay.visible}
        presentationStyle="overFullScreen"
        animationIn={'fadeInUpBig'}>
        <SafeAreaView
          style={{
            height: height,
            paddingTop: Math.max(insets.top, 0),
          }}
          edges={['top']}>
          {imgOverlay.type === 1 ? (
            <View style={{flex: 1}}>
              <View
                style={{
                  position: 'absolute',
                  top: height * 0.01,
                  left: width * 0.02,
                  zIndex: 10,
                }}>
                <Ionicons
                  name="close-circle-sharp"
                  color={'#fff'}
                  size={32}
                  onPress={() => {
                    setImgOverlay({
                      visible: false,
                      type: 1,
                      uri: '',
                    });
                  }}
                />
              </View>
              {mess.typeMessage === 2 || mess.typeMessage === 5 ? (
                <ImageViewer
                  enableSwipeDown={true}
                  onSwipeDown={() => {
                    setImgOverlay({
                      visible: false,
                      type: 1,
                      uri: '',
                    });
                  }}
                  renderImage={props => {
                    // const check = props.style.width
                    //   ? height / width >= props.style.height / props.style.width
                    //   : null;

                    return (
                      <FastImage
                        source={{uri: props.source.uri}}
                        // style={{
                        //   width: check
                        //     ? width
                        //     : props.style.height
                        //     ? (width * height) / props.style.height
                        //     : 0,
                        //   height: check
                        //     ? (width * props.style.height) / props.style.width
                        //     : height,
                        // }}
                        style={{
                          width: props.style.width ?? width,
                          height: props.style.height ?? height,
                        }}
                      />
                    );
                  }}
                  imageUrls={[{url: imgOverlay.uri}]}
                  enableImageZoom={true}
                />
              ) : mess.typeMessage === 3 ? (
                <OverlayVideo uri={mess.message.replaceAll('"', '')} />
              ) : (
                <ImageViewer
                  imageUrls={getArrayUrl()}
                  onSwipeDown={() => {
                    setImgOverlay({
                      visible: false,
                      type: 1,
                      uri: '',
                    });
                  }}
                  renderImage={props => {
                    // const check = props.style.width
                    //   ? height / width >= props.style.height / props.style.width
                    //   : null;
                    return (
                      <FastImage
                        source={{
                          uri: props.source.uri,
                        }}
                        // style={{
                        //   width: check
                        //     ? width
                        //     : props.style.height
                        //     ? (width * height) / props.style.height
                        //     : 0,
                        //   height: check
                        //     ? (width * props.style.height) / props.style.width
                        //     : height,
                        // }}
                        style={{
                          width: props.style.width ?? width,
                          height: props.style.height ?? height,
                        }}
                      />
                    );
                  }}
                  enableImageZoom={true}
                  enableSwipeDown={true}
                  index={getIndexImgOverlay()}
                />
              )}
            </View>
          ) : (
            <Pressable
              onPress={() => {
                setImgOverlay({
                  visible: false,
                  type: 1,
                  uri: '',
                });
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: width * 0.05,
              }}>
              <TouchableWithoutFeedback>
                <>
                  <View
                    style={{
                      alignItems: mess.side === 1 ? 'flex-end' : 'flex-start',
                      width: '100%',
                      paddingBottom: height * 0.01,
                    }}>
                    {mess.typeMessage === 2 && (
                      <ImgChat
                        mess={
                          mess.typeMessage === 2
                            ? imgOverlay.uri
                            : imgOverlay.uri.replaceAll('"', '')
                        }
                        overlayReview={false}
                      />
                    )}
                    {mess.typeMessage === 3 && (
                      <VideoComponent
                        uri={imgOverlay.uri.replaceAll('"', '')}
                      />
                    )}
                  </View>

                  <TooltipMessage
                    mess={mess}
                    deleteMess={deleteMess}
                    setEmotionVisible={() => {
                      setImgOverlay({
                        visible: false,
                        type: 1,
                        uri: '',
                      });
                    }}
                  />
                </>
              </TouchableWithoutFeedback>
            </Pressable>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  mess: {
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    // alignSelf: 'flex-end',
    maxWidth: '70%',
    // borderRadius: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    minWidth: '15%',
  },
  mesSend: {
    backgroundColor: '#0078fe',
    marginBottom: 5,
    marginRight: '2.5%',
    // alignSelf: 'flex-end',
    borderBottomLeftRadius: 16,
  },
  mesRecv: {
    backgroundColor: '#dedede',
    marginLeft: '1.5%',
    // alignSelf: 'flex-start',
    alignItems: 'center',
    borderBottomRightRadius: 16,
  },
  backgroundVideo: {
    height: height * 0.3,
    width: width * 0.7,
    borderRadius: 8,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});
