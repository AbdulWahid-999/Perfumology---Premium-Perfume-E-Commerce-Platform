import { useState } from 'react';

const PriceRangeSlider = ({ min = 0, max = 500, value, onChange }) => {
  const [minValue, setMinValue] = useState(value?.min || min);
  const [maxValue, setMaxValue] = useState(value?.max || max);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(newMin);
    onChange({ min: newMin, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(newMax);
    onChange({ min: minValue, max: newMax });
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <div className="text-sm">
          <span className="font-semibold text-gray-700">Min:</span>
          <span className="ml-2 text-primary-600 font-bold">${minValue}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-gray-700">Max:</span>
          <span className="ml-2 text-primary-600 font-bold">${maxValue}</span>
        </div>
      </div>

      <div className="relative h-2">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>

        {/* Active Range */}
        <div
          className="absolute h-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
