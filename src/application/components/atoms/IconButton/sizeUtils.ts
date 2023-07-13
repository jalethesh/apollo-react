export type IconSize = 'Xs' | 'Sm' | 'Md' | 'Lg';
export type ContainerSize = IconSize | 'Xl';

export interface SectionSize {
  svgSize: number;
  spacing: number;
  borderRadius: number;
}

export enum IconSizeMapper {
  XS = 16,
  SM = 18,
  MD = 20,
  LG = 24,
}

export const containedIconSizeMapper = (
  containerSize: ContainerSize
): SectionSize => {
  switch (containerSize) {
    case 'Xs':
      return { svgSize: IconSizeMapper.XS, spacing: 2, borderRadius: 4 };
    case 'Sm':
      return { svgSize: IconSizeMapper.SM, spacing: 3, borderRadius: 5 };
    case 'Md':
      return { svgSize: IconSizeMapper.MD, spacing: 8, borderRadius: 8 };
    case 'Lg':
      return { svgSize: IconSizeMapper.LG, spacing: 12, borderRadius: 12 };
    case 'Xl':
      return { svgSize: IconSizeMapper.LG, spacing: 18, borderRadius: 16 };
    default:
      return { svgSize: IconSizeMapper.SM, spacing: 3, borderRadius: 5 };
  }
};
