import Spinner from "./ui/SpinnerLarge";

function PageSuspense() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="h-16 w-16 text-blue-500" />
    </div>
  );
}

export default PageSuspense;
