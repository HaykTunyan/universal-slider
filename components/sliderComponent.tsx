"use client";

import React, { FC, ChangeEvent, useState } from "react";
import "./slider.css";

/**
 * Interface representing a SliderProps.
 *
 * @interface
 * @property {number[]}  - The slider possiton is array for number argumnet.
 * @property {min}  -  The slider  min props is the type number.
 * @property {max}  - The slider max propst is the type number.
 * @property {step?} - The slider step props is type  number.
 * @property {value} = The  value of the input element.
 * @property {onChange} - The onChange .
 * @property {onRelease}  - The onRelease.
 */
interface SliderProps {
  positions: number[];
  min: number;
  max: number;
  step?: number;
  value: number | undefined;
  onChange: (value: number) => void;
  onRelease: (nearestPositionIndex: number) => void;
}

const Slider: FC<SliderProps> = (props) => {
  /**
   *  Slider Component Hooks.
   */

  const {
    min = 0,
    max,
    step = 1,
    positions,
    value,
    onChange,
    onRelease,
  } = props;

  const [sliderValue, setSliderValue] = useState(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setSliderValue(newValue);
    onChange(newValue);
  };

  const handleMouseUp = () => {
    const nearestPosition = positions.reduce((prev, curr) => {
      return Math.abs(curr - sliderValue) < Math.abs(prev - sliderValue)
        ? curr
        : prev;
    });
    setSliderValue(nearestPosition);
    onChange(nearestPosition);
  };

  const handleRelease = () => {
    const nearestPositionIndex = findNearestPositionIndex();
    setSliderValue(nearestPositionIndex);
    onRelease(nearestPositionIndex);
  };

  const findNearestPositionIndex = () => {
    const distances = positions.map((pos) => Math.abs(pos - sliderValue));
    const nearestIndex = distances.indexOf(Math.min(...distances));
    return nearestIndex;
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={positions?.length - 1}
        step={step}
        value={sliderValue}
        onChange={handleInputChange}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleRelease}
        className="slider"
      />

      <div className="slider-markers">
        {positions?.length &&
          positions.map((position, index) => (
            <div
              key={index}
              className="slider-marker"
              style={{
                left: `calc(${(index / (positions.length - 1)) * 100}% - 8px)`,
              }}
            >
              {position}
            </div>
          ))}
      </div>
      <div className="mt-5" />
      <div className="slider-value">{positions[sliderValue]}</div>
    </div>
  );
};

export default Slider;
