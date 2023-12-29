import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { NumberCombobox } from "./numberSelection";

export type SidaBarSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const SideBarSearch = ({ search, setSearch }: SidaBarSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 h-max items-center p-4 shadow-lg shadow-background w-full z-10">
      <div className="flex flex-row gap-2 h-max items-center justify-center place-content-evenly relative w-full">
        {!search && <Search />}

        <Input
          placeholder="Pesquisar ou começar uma nova conversa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <X onClick={(e) => setSearch("")} className="cursor-pointer" />
        )}
      </div>
      <NumberCombobox />
    </div>
  );
};
