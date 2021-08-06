import React from 'react';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';

const InfoDotIcon: React.FC = () => {
  return (
    <Icon
      type={IconTypes.ENTYPO}
      name="dot-single"
      size={32}
      color={palette.lightGrey}
    />
  );
};
export default InfoDotIcon;
