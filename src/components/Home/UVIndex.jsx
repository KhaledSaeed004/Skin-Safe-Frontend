import ReactSpeedometer from "react-d3-speedometer";
import { UVIndexRiskLevel } from "../../utils/UVIndex";
import { ArrowPathIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkIcon } from "../../utils/Icons";
import { useUVIndex } from "../../features/UVIndex/useUVIndex";
import DotLoader from "../ui/DotLoader";
import { cn } from "../../utils/cn";

const UV_SEVERITY_GRADIENTS = {
  Low: "linear-gradient(135deg, #4ade80, #facc15)", // green to yellow
  Moderate: "linear-gradient(135deg, #facc15, #fb923c)", // yellow to orange
  High: "linear-gradient(135deg, #fb923c, #f43f5e)", // orange to red
  "Very High": "linear-gradient(135deg, #f43f5e, #b91c1c)", // red to darker red
  Extreme: "linear-gradient(135deg, #7f1d1d, #450a0a)", // deep red-black
};

function UVIndex() {
  const {
    uvIndex,
    riskLevel,
    isLoading,
    error,
    geoError,
    refresh,
    hasPermission,
  } = useUVIndex();
  const badgeBackground =
    UV_SEVERITY_GRADIENTS[riskLevel] ||
    "linear-gradient(135deg, #0f0c29, #302b63)";

  const uvIndexRounded = uvIndex ? Math.round(uvIndex) : 0;
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      }}
      className={cn(
        "relative my-6 flex min-h-[292px] w-full max-w-6xl items-center justify-around self-center overflow-hidden rounded-3xl px-20 py-14 pl-40 text-white",
        isLoading && "justify-center pl-20",
      )}
    >
      {isLoading ? (
        <>
          <DotLoader />
        </>
      ) : (
        <>
          <div
            style={{ background: badgeBackground }}
            className="absolute inset-y-0 left-0 flex aspect-square translate-x-[-50%] flex-col items-center justify-center rounded-full bg-amber-600 pl-32"
          >
            <h2 className="text-8xl font-semibold">{uvIndexRounded}</h2>
            <span className="text-lg font-medium">{riskLevel}</span>
          </div>
          <ReactSpeedometer
            svgAriaLabel="UV Index Meter"
            minValue={0}
            maxValue={12}
            value={uvIndex}
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
          <div className="my-auto max-w-md">
            {error ||
              (geoError && (
                <p className="mb-1 text-red-300">
                  {error?.message || geoError}
                </p>
              ))}
            <h3 className="text-2xl font-semibold">UV Index</h3>
            <p className="mt-2 text-sm">
              Exposure to ultraviolet (UV) rays, whether from sun or artificial
              sources like tanning beds, can have harmful effects on your skin,
              eyes and overall health. It’s important to understand the risks
              and take protective steps to protect yourself.
            </p>
            <div className="mt-4 flex items-center gap-6">
              <button
                onClick={refresh}
                className="flex cursor-pointer items-center rounded-lg border bg-transparent px-3 py-1 transition-colors duration-300 ease-in hover:border-white hover:bg-white hover:text-[#1e3c72]"
              >
                <ArrowPathIcon className="mr-1 inline-block size-5" />
                Refresh
              </button>
              <a
                href="https://www.epa.gov/sunsafety/learn-about-uv-index"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <LinkIcon
                  size={20}
                  color="white"
                  className="mr-1 inline-block"
                />
                Learn More
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UVIndex;
