import { ReactNode } from 'react';

import { ContainerSize, IconSize } from './sizeUtils';

export type ColorVariant =
  | 'Normal'
  | 'Primary'
  | 'Secondary'
  | 'Negative'
  | 'Tertiary'
  | 'Fourth'
  | 'ToolPrimary'
  | 'ToolSecondary'
  | 'ToolNegative'
  | 'Success';

interface CommonProps {
  style?: any;
  title?: string;
  icon: ReactNode;
  disabled?: boolean;
  color: ColorVariant;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface IconWithTextProps extends CommonProps {
  variant: 'WithText';
}

export interface FreeIconProps extends CommonProps {
  variant: 'Free';
  size?: IconSize;
  isLight?: boolean;
}

export interface ContainedIconProps extends CommonProps {
  variant: 'Contained';
  size?: ContainerSize;
}
