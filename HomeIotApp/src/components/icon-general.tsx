import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import { IconProps } from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export type TypeIcon =
  | 'Ionicons'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'FontAwesome6'
  | 'FontAwesome6Brands'
  | 'Fontisto'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';
interface Props extends IconProps {
  type: TypeIcon;
  name: string;
  onPress?: (event: any) => void;
}
const IconGeneral = ({ type, ...rest }: Props) => {
  switch (type) {
    case 'Ionicons':
      return <Ionicons {...rest} />;
    case 'AntDesign':
      return <AntDesign {...rest} />;
    case 'Entypo':
      return <Entypo {...rest} />;
    case 'EvilIcons':
      return <EvilIcons {...rest} />;
    case 'Feather':
      return <Feather {...rest} />;
    case 'FontAwesome':
      return <FontAwesome {...rest} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...rest} />;
    case 'FontAwesome5Pro':
      return <FontAwesome5Pro {...rest} />;
    case 'Fontisto':
      return <Fontisto {...rest} />;
    case 'Foundation':
      return <Foundation {...rest} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...rest} />;
    case 'MaterialIcons':
      return <MaterialIcons {...rest} />;
    case 'Octicons':
      return <Octicons {...rest} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons {...rest} />;
    case 'Zocial':
      return <Zocial {...rest} />;
    default:
      return <Ionicons {...rest} />;
  }
};

export default IconGeneral;
