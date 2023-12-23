import { Search, X } from "lucide-react";

export type SidaBarSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const SideBarSearch = ({ search, setSearch }: SidaBarSearchProps) => {
  return (
    <div className="flex items-center bg-component-pageHeader w-full h-max py-2">
      <div className="relative w-full h-max px-2 flex items-center gap-2 justify-center">
        {!search && (
          <div className="justify-self-start text-icon h-full w-9">
            <Search className="text-icon" />
          </div>
        )}

        <input
          className="w-full h-9 rounded-xl shadow-md bg-component-textInputField-dark  text-white text-sm px-10"
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
