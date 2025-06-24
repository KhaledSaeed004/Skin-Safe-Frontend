import React from "react";

const Meter = ({ value = 0, max = 100, size = 200 }) => {
  const center = size / 2;
  const radius = center - 20;
  const angle = (value / max) * 180; // 0 to 180 degrees

  // Needle endpoint
  const needleLength = radius - 10;
  const needleAngleRad = ((angle - 90) * Math.PI) / 180;
  const needleX = center + needleLength * Math.cos(needleAngleRad);
  const needleY = center + needleLength * Math.sin(needleAngleRad);

  // Generate arc path for the half circle
  const arcPath = describeArc(center, center, radius, 0, 180);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={center + 20}>
        {/* Arc */}
        <path d={arcPath} fill="none" stroke="#E5E7EB" strokeWidth="14" />

        {/* Labels */}
        {[...Array(6)].map((_, i) => {
          const val = (max / 5) * i;
          const ang = (val / max) * 180 - 90;
          const labelX =
            center + (radius - 20) * Math.cos((ang * Math.PI) / 180);
          const labelY =
            center + (radius - 20) * Math.sin((ang * Math.PI) / 180);
          return (
            <text
              key={i}
              x={labelX}
              y={labelY}
              fontSize="12"
              textAnchor="middle"
              alignmentBaseline="middle"
              className="fill-gray-700"
            >
              {val}
            </text>
          );
        })}

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={needleX}
          y2={needleY}
          stroke="#4A90E2"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Center pin */}
        <circle cx={center} cy={center} r="5" fill="#4A90E2" />
      </svg>

      <p className="mt-2 text-sm font-medium text-gray-700">Value: {value}</p>
    </div>
  );
};

// Utility functions to describe SVG arc path
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export default Meter;
