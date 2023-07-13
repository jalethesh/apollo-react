import { ReactText, useRef } from 'react';

import styled from '@emotion/styled';
import {
  positionValues,
  ScrollbarProps,
  Scrollbars,
} from 'react-custom-scrollbars-2';

export const Scrollbar = ({ children, height, ...props }: ScrollbarProps) => {
  const topShadowRef = useRef<HTMLDivElement>(null);
  const bottomShadowRef = useRef<HTMLDivElement>(null);

  const onUpdateScrollbar = (values: positionValues) => {
    const { scrollTop, scrollHeight, clientHeight } = values;

    const shadowTopOpacity = (1 / 50) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity =
      (1 / 50) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

    if (topShadowRef.current) {
      topShadowRef.current.style.opacity = shadowTopOpacity.toString();
    }

    if (bottomShadowRef.current) {
      bottomShadowRef.current.style.opacity = shadowBottomOpacity.toString();
    }
  };

  return (
    <Container height={height}>
      {/*/ @ts-ignore*/}
      <Scrollbars
        style={{ width: '100%', height: '100%', ...props.style }}
        onUpdate={onUpdateScrollbar}
        renderThumbVertical={(style, _props) => (
          <ThumbVertical style={{ ...style }} {..._props} />
        )}
        {...props}
      >
        {children}
      </Scrollbars>
      <TopShadow ref={topShadowRef} />
      <BottomShadow ref={bottomShadowRef} />
    </Container>
  );
};

interface ContainerProps {
  height?: ReactText;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  height: ${({ height }) => height};
`;

const TopShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const BottomShadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const ThumbVertical = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export default Scrollbar;
