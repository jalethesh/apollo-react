import { css } from '@emotion/react';
import styled from '@emotion/styled';

export type ImageSize = 'XS' | 'SM' | 'MD' | 'LG';

export enum ImageSizeMapper {
  XS = 32,
  SM = 48,
  MD = 56,
  LG = 120,
}
export interface IAvatar {
  src: string;
  size: ImageSize;
  alt?: string;
}

// TODO: add lazy load and fallback
const Avatar = styled.img<IAvatar>`
  ${({ size }) => {
    return css`
      width: ${ImageSizeMapper[size]}px;
      height: ${ImageSizeMapper[size]}px;
      border-radius: 50%;
    `;
  }}
`;

export default Avatar;
