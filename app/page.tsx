"use client";

import Slider from "@/components/sliderComponent";
import React, { useState } from "react";

export default function Home() {
  /**
   *  Home Page Component.
   */

  // Integration Imperative State for The compoennt.
  const [value, setValue] = useState(5);
  const [minSlider, setMinSlider] = useState(0);
  const [maxSlider, setMaxSlider] = useState(100);
  const [stepSlider, setStepSlider] = useState(0);

  const positions = ["Low", "Medium", "High"];
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);

  const handlePositionChange = (positionIndex: number) => {
    setSelectedPosition(positions[positionIndex]);
  };

  return (
    <div className="w-full h-auto border-red-100 bg-slate-600">
      <div className="pt-10" />
      <div className="flex justify-center flex-1 px-2">
        <Slider positions={positions} onChange={handlePositionChange} />
      </div>
      <div className="mt-10">
        <p className="text-center text-lg ring-green-800">
          Selected position for slider: {selectedPosition}
        </p>
      </div>
    </div>
  );
}
