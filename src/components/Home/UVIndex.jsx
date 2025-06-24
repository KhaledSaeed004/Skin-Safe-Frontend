import ReactSpeedometer from "react-d3-speedometer";
import { UVIndexRiskLevel } from "../../utils/UVIndex";
import { useEffect, useState } from "react";

function UVIndex() {
  const [value, setValue] = useState(6);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((prevValue) => prevValue + 1);
  //     if (value === 12) {
  //       setValue(0);
  //     }
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, [value]);

  return (
    <div className="bg-primary my-6 flex w-full max-w-6xl justify-around self-center rounded-3xl px-20 py-14 text-white">
      <ReactSpeedometer
        svgAriaLabel="UV Index Meter"
        minValue={0}
        maxValue={12}
        value={value}
        segments={1000}
        maxSegmentLabels={4}
        currentValueText="UV Index"
        textColor="#fff"
        needleColor="#fff"
        startColor="#a1f718"
        endColor="#ff0000"
        ringWidth={10}
        needleHeightRatio={0.7}
        height={180}
      />
      <div className="max-w-md">
        <h2 className="flex flex-col text-3xl font-semibold">
          <span className="text-4xl font-semibold">{value}</span>
          <span className="text-lg font-medium">{UVIndexRiskLevel(value)}</span>
        </h2>
        <p className="mt-2 text-sm">
          Exposure to ultraviolet (UV) rays, whether from sun or artificial
          sources like tanning beds, can have harmful effects on your skin, eyes
          and overall health. It’s important to understand the risks and take
          protective steps to protect yourself.
        </p>
      </div>
    </div>
  );
}

export default UVIndex;
