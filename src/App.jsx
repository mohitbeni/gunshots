import { useCallback, useState, useRef } from "react";
import "./styles.css";

const ourDebounced = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const ourThrottled = (fn, delay) => {
  let timer;
  return (...args) => {
    if (!timer) {
      fn(...args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
};
export default function App() {
  const [debouncedInput, setDebouncedInput] = useState("");
  const [throttledInput, setThrottledInput] = useState("");
  const [normalGun, setNormalGun] = useState(0);
  const [debouncedGun, setDebouncedGun] = useState(0);
  const [throttledGun, setThrottledGun] = useState(0);

  const debouncedGunRef = useRef(0);
  const throttledGunRef = useRef(0);

  const handleChangeDebounced = (e) => {
    setDebouncedInput(e.target.value);
    // console.log(e.target.value);
  };

  const handleChangeThrottled = (e) => {
    setThrottledInput(e.target.value);
    // console.log(e.target.value);
  };

  const handleNormalClick = () => {
    setNormalGun((prev) => prev + 1);
  };
  const handleDebouncedClick = () => {
    setDebouncedGun(debouncedGunRef.current);
  };
  const handleThrottledClick = () => {
    setThrottledGun(throttledGunRef.current);
  };

  const handleDeboucedCount = () => {
    debouncedGunRef.current = debouncedGunRef.current + 1;
  };

  const handleThrottledCount = () => {
    throttledGunRef.current = throttledGunRef.current + 1;
  };

  const debouncedGunFn = useCallback(
    ourDebounced(handleDebouncedClick, 500),
    []
  );
  const throttledGunFn = useCallback(
    ourThrottled(handleThrottledClick, 1000),
    []
  );
  const debouncedInputFn = useCallback(
    ourDebounced(handleChangeDebounced, 500),
    []
  );
  const throttledInputFn = useCallback(
    ourThrottled(handleChangeThrottled, 1000),
    []
  );
  return (
    <div className="App">
      <input onChange={debouncedInputFn} />
      <input onChange={throttledInputFn} />
      <h2>Debounced: {debouncedInput}</h2>
      <h2>Throttled: {throttledInput}</h2>
      <div>
        <div className="container" onClick={handleNormalClick}>
          <div className="gun-container">
            <div className="gun-handle"></div>
            <div className="gun-front"></div>
          </div>
          <div className="bullet"></div>
          <h2 style={{ marginLeft: "100px" }}>Count : {normalGun}</h2>
        </div>
        <div
          className="container"
          onClick={() => {
            handleDeboucedCount();
            debouncedGunFn();
          }}
        >
          <div className="gun-container">
            <div className="gun-handle"></div>
            <div className="gun-front"></div>
          </div>
          <div className="bullet"></div>
          <h2 style={{ marginLeft: "100px" }}>Count : {debouncedGun}</h2>
        </div>
        <div
          className="container"
          onClick={() => {
            handleThrottledCount();
            throttledGunFn();
          }}
        >
          <div className="gun-container">
            <div className="gun-handle"></div>
            <div className="gun-front"></div>
          </div>
          <div className="bullet"></div>
          <h2 style={{ marginLeft: "100px" }}>Count : {throttledGun}</h2>
        </div>
      </div>
    </div>
  );
}
