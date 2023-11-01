import React, {PropsWithChildren, useState} from 'react';
import {Tooltip} from '@rneui/themed';
import {TooltipProps} from '@rneui/base';

const TooltipStore: React.FC<PropsWithChildren<TooltipProps>> = props => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

export default TooltipStore;
