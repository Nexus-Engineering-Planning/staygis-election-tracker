"use client";

import { useEffect, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/lib/hooks/use-debounce";

export type AutoCompleteOption = {
  value: string;
  label: string;
};

interface AutocompleteProps {
  options: AutoCompleteOption[];
  value?: string;
  placeholder?: string;
  isLoading?: boolean;
  onSelect?: (value: string) => void;
  onSearch?: (debouncedValue: string) => void;
}

const Autocomplete = ({
  options,
  value,
  placeholder,
  isLoading,
  onSelect,
  onSearch,
}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const selectedLabel = value
    ? options.find((option) => option.value === value)?.label
    : "";

  useEffect(() => {
    if (onSearch && debouncedSearch) {
      onSelect?.("");
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch, onSelect]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="autocomplete"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedLabel || placeholder || "Select option..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder || "Search option..."}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : options.length === 0 ? (
              <CommandEmpty>No option found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      console.log("currentValue", currentValue, "Value", value);
                      setSearch("");
                      onSelect?.(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Autocomplete;
