"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { baseUrl } from "@/services";
import { useUserHeaders } from "@/hooks";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { MetaAccount } from "@/models";
import { setCurrentMetaAccounts } from "@/store/current-meta-account";

export function NumberCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { headers, user } = useUserHeaders();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [numbers, setNumbers] = useState<MetaAccount[]>([]);

  useEffect(() => {
    if (user.id) {
      fetch(`${baseUrl}/companies/${user?.company?.id}/numbers`, {
        method: "GET",
        headers,
      })
        .then(async (response) => {
          const data = await response.json();

          if (response.status !== 200) throw new Error(data.message[0]);

          const extractedNumbers = data.metaBusinessAccount.map(
            (item: MetaAccount) => item
          );

          setNumbers(extractedNumbers);
        })
        .catch((error) => {
          toast({
            title: "Erro",
            description: error.message,
            variant: "destructive",
          });
        });
    }
  }, [user]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[300px] justify-between"
        >
          {value
            ? numbers.find((number) => number.id === value)?.numberId
            : "Selecione um número"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Procurar número" className="h-9" />
          {/* TODO: verificar por que o numpad não conta */}
          <CommandEmpty>Número não encontrado.</CommandEmpty>
          <CommandGroup>
            {numbers.map((number) => (
              <CommandItem
                key={number.id}
                value={number.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  dispatch(setCurrentMetaAccounts(number));
                }}
              >
                {number.numberId}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === number.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
