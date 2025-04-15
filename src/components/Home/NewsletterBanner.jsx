import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Button from "../ui/Button";
import Input from "../ui/Input";

function NewsletterBanner() {
  return (
    <div className="bg-primary w-full rounded-3xl py-14 text-center text-white">
      <span className="space-y-4">
        <h2 className="text-3xl font-semibold">Sign up to our newsletter!</h2>
        <p className="mx-auto max-w-sm text-sm">
          Lorem ipsum dolor sit amet consectetur. Egestas et feugiat purus enim
          facilisi nunc blandit nullam.
        </p>
      </span>
      <form aria-label="Newsletter signup" className="relative mx-auto w-fit">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          className="mt-10 min-w-md border-0 px-8 py-4 pr-14 text-sm hover:shadow-none"
        />
        <Button
          // type="submit"
          onClick={(e) => {
            e.preventDefault();
            // alert("Sign up successful!");
          }}
          className="active:bg-primary absolute top-1/2 right-2 min-w-fit px-2 hover:shadow-transparent active:scale-90 active:text-white"
        >
          <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}

export default NewsletterBanner;
