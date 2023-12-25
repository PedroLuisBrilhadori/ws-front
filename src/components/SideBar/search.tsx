import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export type SidaBarSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const SideBarSearch = ({ search, setSearch }: SidaBarSearchProps) => {
  return (
    <div className="flex items-center bg-component-pageHeader w-full h-max py-2">
      {/* TODO: assess className usage */}
      <div className="relative w-full h-max px-2 flex flex-row items-center gap-2 justify-center place-content-evenly">
        {!search && (
          <div className=" text-icon h-full">
            <Search className="text-icon" />
          </div>
        )}

        <Input
          placeholder="Pesquisar ou começar uma nova conversa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div onClick={(e) => setSearch("")} className="cursor-pointer">
            <X className="text-icon" />
          </div>
        )}
      </div>
    </div>
  );
};
