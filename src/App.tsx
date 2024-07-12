// App.tsx
import React, { useEffect, useRef, useState } from "react";
import { useKey, useKeyPress } from "react-use";
import "./App.css";

function App() {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const gravity = 0.98;
  const groundLevel = 893;

  // const Up = () => setTop((top) => top - 10);
  const Down = () => setTop((top) => top + 10);
  const Left = () => setLeft((left) => left - 10);
  const Right = () => setLeft((left) => left + 10);
  // const Space = () =>
  // useKey("ArrowUp", Up);
  useKey("ArrowDown", Down);
  useKey("ArrowLeft", Left);
  useKey("ArrowRight", Right);

  useKey("ArrowUp", () => {
    setVelocity((prevVelocity) => ({
      ...prevVelocity,
      y: -15, // 上向きの速度を追加
    }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x,
        y: prevVelocity.y + gravity,
      }));

      setTop((prevTop) => {
        const newY = prevTop + velocity.y;
        if (newY >= groundLevel) {
          return groundLevel;
        }

        return newY;
      });

      setLeft((prevLeft) => prevLeft + velocity.x);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [velocity, gravity, groundLevel]);

  return (
    <div className="container">
      <div
        className="box"
        style={{
          top: top,
          left: left,
          width: "50px",
          height: "50px",
        }}
      ></div>
    </div>
  );
}

export default App;
