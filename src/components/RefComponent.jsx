import React, { useImperativeHandle, useRef } from 'react';
import { forwardRef } from 'react';

const RefComponent = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollDown() {
        inputRef.current.style.transform = `translateX(${20}px)`;
      }
    };
  }, []);
  return (
    <div>
      <input {...props} ref={inputRef} />
    </div>
  );
});

export default RefComponent;
