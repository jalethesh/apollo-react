import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

type Style = DraggingStyle | NotDraggingStyle;
export const blockXAxios = (style?: Style): Style => {
  if (!style) {
    return {};
  }

  if (style.transform) {
    const axisLockY = `translate(0px${style.transform.slice(
      style.transform.indexOf(','),
      style.transform.length
    )}`;
    return {
      ...style,
      transform: axisLockY,
    };
  }

  return style;
};
