import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "../../utils/cn";

type Option = {
  name: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: Option | null;
  placeholder?: string;
  onChange: (option: Option | null) => void;
  className?: string;
};

export default function Select({
  options,
  value,
  placeholder,
  onChange,
  className,
}: SelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={cn("relative w-full", className)}>
        <ListboxButton
          className={cn(
            "relative block w-full rounded-md border border-black py-1 pr-8 pl-3 text-left text-sm text-black",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black",
          )}
        >
          {value ? value.name : placeholder}
          <ChevronDownIcon
            className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 fill-black"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={cn(
            "mt-2 w-[var(--button-width)] rounded-md border border-black p-1",
            "[--anchor-gap:var(--spacing-1)]",
            "transition duration-100 ease-in focus:outline-none data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-[focus]:bg-gray-200"
            >
              <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm text-black">{option.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
