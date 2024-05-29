import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface SliceProps {
  radius: number;
  startAngle: number;
  endAngle: number;
}

const CircleSlice: React.FC<SliceProps> = ({
  radius,
  startAngle,
  endAngle,
}) => {
  const centerX = radius;
  const centerY = radius;
  const startX = radius + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = radius + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = radius + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = radius + radius * Math.sin((endAngle * Math.PI) / 180);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const gradientId = 'sliceGradient';
  const pathData = `
    M ${centerX},${centerY}
    L ${startX},${startY}
    A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}
    Z
  `;

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg width={radius * 2} height={radius * 2}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#9CC76F" />
            <Stop offset="100%" stopColor="#E7FCAB" />
          </LinearGradient>
        </Defs>
        <Path d={pathData} fill={`url(#${gradientId})`} />
      </Svg>
    </View>
  );
};

export default CircleSlice;
