import {
  ActivityIndicator,
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import IconGeneral from '@/components/common/icon-general';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
const {width, height} = Dimensions.get('screen');
type Props = {
  uri: string;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
};
const VideoComponent = ({uri, onPress, onLongPress}: Props) => {
  const videoPlayer = useRef<Video | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);

  const onSeek = (seek: any) => {
    //Handler for change in seekbar
    videoPlayer.current?.seek(seek);
  };

  const onPaused = (playerStateNew: any) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerStateNew);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current?.seek(0);
  };

  const onProgress = (data: any) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = (currentTimeNew: number) => setCurrentTime(currentTimeNew);
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'black',
        borderRadius: 8,
      }}>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '55%',
            transform: [{translateX: -25}, {translateY: -25}],
          }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <Video
        source={{
          uri: uri,
        }}
        style={styles.backgroundVideo}
        resizeMode="contain"
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        playWhenInactive
        volume={1}
      />
      {/* <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        isFullScreen={false}
        containerStyle={{
          borderRadius: 8,
          paddingBottom: '10%',
        }}
        showOnStart={false}>
        <MediaControls.Toolbar>
          <View />
        </MediaControls.Toolbar>
      </MediaControls> */}
    </Pressable>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height * 0.2,
    width: width * 0.8,
    borderRadius: 8,
  },
});
