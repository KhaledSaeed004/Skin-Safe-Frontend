function DotLoader() {
  return (
    <div className="flex flex-row gap-2">
      <div className="h-4 w-4 animate-pulse rounded-full bg-slate-300 [animation-duration:1s]"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-slate-300 [animation-delay:-.3s] [animation-duration:1s]"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-slate-300 [animation-delay:-.5s] [animation-duration:1s]"></div>
    </div>
  );
}

export default DotLoader;
