import Skeleton from "react-loading-skeleton";

function CardWrapper({ children }) {
  return (
    <div className="flex w-60 flex-shrink-0 flex-col rounded-md border border-gray-200 p-6">
      {children}
    </div>
  );
}

function DoctorCardSkeleton({ variant = "portrait", staticMode = false }) {
  const animationMode = !staticMode;

  return variant === "landscape" ? (
    <div className="flex flex-shrink-0 cursor-pointer gap-4 rounded-md border border-gray-200">
      <div className="my-auto ml-6 w-fit">
        <Skeleton
          enableAnimation={animationMode}
          circle={true}
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col justify-between py-6 pr-6">
        <div className="pr-16">
          <h3 className="mb-2 text-lg font-medium">
            <Skeleton enableAnimation={animationMode} width={140} />
          </h3>
          <p className="mb-1 text-sm text-gray-500">
            <Skeleton enableAnimation={animationMode} width={80} />
          </p>
          <p className="text-xs">
            <Skeleton enableAnimation={animationMode} width={100} height={10} />
          </p>
        </div>
        <div className="mt-6 flex items-center justify-end">
          <Skeleton
            enableAnimation={animationMode}
            width={80}
            height={15}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  ) : (
    <CardWrapper>
      <div className="mb-4 w-fit self-center overflow-hidden rounded-full">
        <Skeleton
          enableAnimation={animationMode}
          circle={true}
          width={80}
          height={80}
        />
      </div>
      <h3 className="mb-1 text-lg font-semibold">
        <Skeleton enableAnimation={animationMode} width={140} />
      </h3>
      <p className="mb-1 text-sm text-gray-500">
        <Skeleton enableAnimation={animationMode} width={80} />
      </p>
      <p className="text-xs">
        <Skeleton enableAnimation={animationMode} width={100} height={10} />
      </p>
      <div className="mt-6 flex items-center justify-between">
        <Skeleton
          enableAnimation={animationMode}
          width={80}
          height={15}
          className="rounded-md"
        />
        <Skeleton
          enableAnimation={animationMode}
          width={50}
          height={15}
          className="rounded-md"
        />
      </div>
    </CardWrapper>
  );
}

export default DoctorCardSkeleton;
