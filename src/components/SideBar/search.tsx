export type SidaBarSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const SideBarSearch = ({ search, setSearch }: SidaBarSearchProps) => {
  return (
    <div className="flex bg-[#111b21] w-full h-max px-3 py-2">
      <div className="relative w-[95%] h-max">
        <div className="absolute text-[#AEBAC1] h-full w-9">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="left-[50%] right-[50%] ml-auto mr-auto h-full"
          >
            <path
              fill="currentColor"
              d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
            ></path>
          </svg>
        </div>
        <div className="">
          <input
            className="w-[96%] h-9 rounded-lg bg-[#202c33] text-white text-sm px-10"
            placeholder="Pesquisar ou começar uma nova conversa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-[5%] h-full items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          preserveAspectRatio="xMidYMid meet"
          className="text-[#778690]"
        >
          <path
            fill="currentColor"
            d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
