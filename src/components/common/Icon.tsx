import React from 'react';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {IconTypes} from 'src/constants';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

const getIconFont = (type: IconTypes) => {
  switch (type) {
    case IconTypes.FONTISTO:
      return Fontisto;
    case IconTypes.MATERIAL:
      return MaterialIcons;
    case IconTypes.EVIL:
      return EvilIcon;
    case IconTypes.FEATHER:
      return Feather;
    case IconTypes.ANT:
      return AntDesign;
    case IconTypes.ZOCIAL:
      return ZocialIcon;
    case IconTypes.SIMPLE:
      return SimpleLineIcon;
    case IconTypes.FOUNDATION:
      return FoundationIcon;
    case IconTypes.FA:
      return FAIcon5;
    case IconTypes.FA5:
      return FAIcon;
    case IconTypes.IONICON:
      return Ionicon;
    case IconTypes.MATERIAL_COMMUNITY:
      return MaterialCommunityIcon;
    case IconTypes.ENTYPO:
      return EntypoIcon;
    case IconTypes.OCTICON:
      return OcticonIcon;
    default:
      return MaterialIcons;
  }
};
interface Props {
  type: IconTypes;
  name: string;
  size?: number;
  color?: string;
  testID?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}

const Icon: React.FC<Props> = ({type, ...props}) => {
  const FontIcon = getIconFont(type);

  return <FontIcon {...props} />;
};

export default Icon;
