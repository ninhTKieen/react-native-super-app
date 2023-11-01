import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
const {width, height} = Dimensions.get('screen');
type Props = {
  uri: string;
};
const OverlayVideo = ({uri}: Props) => {
  const videoPlayer = useRef<Video | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

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

  const exitFullScreen = () => {
    console.log('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const onSeeking = (currentTimeNew: number) => setCurrentTime(currentTimeNew);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
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
        volume={0}
        fullscreen={true}
        fullscreenOrientation="all"
        fullscreenAutorotate={true}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        isFullScreen={true}
        containerStyle={{
          height: height,
          width: width,
        }}
        showOnStart={false}>
        <MediaControls.Toolbar>
          <View />
        </MediaControls.Toolbar>
      </MediaControls>
    </View>
  );
};

export default OverlayVideo;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: '100%',
    width: '100%',
  },
});
