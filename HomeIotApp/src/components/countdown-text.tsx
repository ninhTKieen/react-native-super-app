import React, { useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';

const CountdownTimer = ({
  milliseconds,
  textStyle,
}: {
  milliseconds: number;
  textStyle?: StyleProp<TextStyle>;
}) => {
  const [timeLeft, setTimeLeft] = useState(milliseconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }
  };

  return (
    <View>
      <Text style={[textStyle]}>{formatTime()}</Text>
    </View>
  );
};

export default CountdownTimer;
