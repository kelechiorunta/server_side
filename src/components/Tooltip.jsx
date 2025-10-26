import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Tooltip = ({ ref, targetRect, content }) => {
  // const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref && ref.current) {
      const { height } = ref?.current?.getBoundingClientRect();
      setTooltipHeight(height);
    }
  }, [ref]);

  let tooltipX = 0;
  let tooltipY = 0;

  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
  }
  if (tooltipY < 0) {
    tooltipY = targetRect.bottom;
  }
  return createPortal(
    <div
      style={{
        position: 'absolute',
        transform: `translateX(${tooltipX}px) translateY(${tooltipY}px)`,
        pointerEvents: 'none',
        backgroundColor: 'black',
        color: 'white',
        left: 0,
        top: -5,
        borderRadius: 5,
        padding: 4
      }}
    >
      {content}
    </div>,
    document.getElementById('portal')
  );
};

export default Tooltip;
