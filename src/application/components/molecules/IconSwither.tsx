import React, { CSSProperties } from 'react';

import IconButton from '$application/components/atoms/IconButton';
import { ColorVariant } from '$application/components/atoms/IconButton/iconButtonTypes';

export interface IIconSwitcher {
  defaultIcon: JSX.Element;
  defaultVariant: ColorVariant;
  activeIcon: JSX.Element;
  activeVariant: ColorVariant;
  isActive?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement> | undefined) => void;
}

const IconSwitcher: React.FC<IIconSwitcher> = ({
  defaultIcon,
  defaultVariant,
  activeIcon,
  activeVariant,
  onClick,
  isActive = false,
  className,
  style,
}) => {
  return (
    <div className={className} style={style}>
      <IconButton
        icon={isActive ? activeIcon : defaultIcon}
        color={isActive ? activeVariant : defaultVariant}
        variant="Free"
        disabled={false}
        onClick={onClick}
      />
    </div>
  );
};

export default IconSwitcher;
