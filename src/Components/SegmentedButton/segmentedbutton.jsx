import { useRef, useState, useEffect } from "react";
import "./segmentedbutton.css";

export const SegmentedControl = (props) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const componentReady = useRef();

  useEffect(() => {
    componentReady.current = true;
  }, []);

  useEffect(() => {
    const activeSegmentRef = props.segments[activeIndex].ref;
    const { offsetWidth, offsetLeft } = activeSegmentRef.current;
    const { style } = props.controlRef.current;

    style.setProperty("--highlight-width", `${offsetWidth}px`);
    style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
  }, [activeIndex, props.callback, props.controlRef, props.segments]);

  const onInputChange = (value, index) => {
    setActiveIndex(index);
    props.callback(value, index);
  };

  return(
    <div className="controls-container" ref={props.controlRef}>
      <div className={`controls ${componentReady.current ? "ready" : "idle"}`}>
        {props.segments?.map((item, i) => (
          <div
            key={item.value}
            className={`segment ${i === activeIndex ? "active" : "inactive"}`}
            ref={item.ref}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              name={props.name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}