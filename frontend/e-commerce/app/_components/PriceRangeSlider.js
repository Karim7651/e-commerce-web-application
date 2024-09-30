'use client';

import React, { useState } from 'react';

const PriceRangeSlider = () => {
  const [minValue, setMinValue] = useState(100);
  const [maxValue, setMaxValue] = useState(500);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 50);
    setMinValue(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 50);
    setMaxValue(value);
  };

  return (
    <div className="p-6">
      <div className="relative">
        {/* Track */}
        <div className="h-2 bg-gray-300 rounded-lg">
          {/* Range Indicator */}
          <div
            className="absolute h-full bg-blue-500 rounded-lg"
            style={{
              left: `${(minValue / 1000) * 100}%`,
              width: `${((maxValue - minValue) / 1000) * 100}%`,
            }}
          />
        </div>

        {/* Min Value Slider */}
        <input
          type="range"
          min="0"
          max="1000"
          value={minValue}
          onChange={handleMinChange}
          className="absolute top-0 left-0 w-full h-2 cursor-pointer appearance-none"
          style={{ zIndex: 2 }}
        />

        {/* Max Value Slider */}
        <input
          type="range"
          min="0"
          max="1000"
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute top-0 left-0 w-full h-2 cursor-pointer appearance-none"
          style={{ zIndex: 1 }}
        />
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <span className="font-medium">Min:</span>
          <div className="ml-2 border border-gray-300 p-2 bg-white rounded shadow">{minValue}</div>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Max:</span>
          <div className="ml-2 border border-gray-300 p-2 bg-white rounded shadow">{maxValue}</div>
        </div>
      </div>
      
      <div className="mt-4 text-lg font-semibold">
        <span>Price Range: </span>
        <span className="text-blue-600">${minValue} - ${maxValue}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
