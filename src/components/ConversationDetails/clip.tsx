import { BookTemplate, Paperclip } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Icon } from "../ui/icon";

export const Clip = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Paperclip className="cursor-pointer" />
        </PopoverTrigger>

        <PopoverContent>
          <Icon onClick={() => {}} className="bg-green-500">
            <BookTemplate aria-label="Templates" />
          </Icon>
        </PopoverContent>
      </Popover>
    </div>
  );
};
