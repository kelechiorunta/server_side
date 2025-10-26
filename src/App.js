import React, { useCallback, useState } from 'react';
import RefComponent from './components/RefComponent.jsx';
import { useRef } from 'react';
import Tooltip from './components/Tooltip.jsx';

export const addThreeToApp = (num) => {
  return num + 3;
};

function App() {
  const [surname, setSurname] = useState('');
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const [targetRect, setTargetRect] = useState(null);
  const handleSelect = (e) => {
    setSurname('Kelechi');
    // setSurname(e.target.innerText);
  };

  // Callback Ref meant to update divRef.current
  const setDivRef = useCallback((node) => {
    if (node) {
      divRef.current = node;
    }
  }, []);

  const handleFocus = () => {
    inputRef.current.focus();
    inputRef.current.scrollDown();
  };

  const handlePointer = (e) => {
    // if (divRef && divRef.current) {
    divRef.current = e.target;
    const { left, right, top, bottom } = e.target.getBoundingClientRect();
    setTargetRect({
      left: left,
      top: top,
      right: right,
      bottom: bottom
    });
    // }
  };

  const handlePointerLeave = () => {
    // const { left, right, top, bottom } = ref.current.getBoundingClientRect();
    setTargetRect(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        Learn React
        {surname && <h1>{surname}</h1>}
        <RefComponent
          placeholder={'Enter Your Name'}
          type={'text'}
          style={{ borderRadius: 5, border: '2px solid black' }}
          ref={inputRef}
        />
        <div
          style={{ cursor: 'pointer' }}
          ref={setDivRef}
          onPointerEnter={handlePointer}
          onPointerLeave={() => handlePointerLeave()}
        >
          Hello Maggie
        </div>
        {divRef && targetRect && (
          <Tooltip
            ref={divRef}
            targetRect={targetRect}
            content={<div>{divRef.current.textContent}</div>}
          />
        )}
        <button
          style={{ cursor: 'pointer', marginTop: 50 }}
          ref={setDivRef}
          onPointerEnter={handlePointer}
          onPointerLeave={() => handlePointerLeave()}
          onClick={handleFocus}
        >
          Focus
        </button>
        <button
          style={{ cursor: 'pointer' }}
          ref={setDivRef}
          onPointerEnter={handlePointer}
          onPointerLeave={() => handlePointerLeave()}
          onClick={handleSelect}
        >
          Show Surname
        </button>
      </header>
    </div>
  );
}

export default App;
