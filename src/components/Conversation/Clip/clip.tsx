import { Paperclip } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setTemplates } from "@/store/templates";
import { useParams } from "react-router-dom";
import { SendTemplate } from "./send-template";
import { UploadImage } from "./upload-image";
import { UploadFile } from "./upload-file";
import { baseUrl } from "@/services";
import { useUserHeaders } from "@/hooks";

export const Clip = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { headers, user } = useUserHeaders();

  const { to } = useParams();

  useEffect(() => {
    if (user.id)
      fetch(`${baseUrl}/templates?status=APPROVED`, { headers }).then(
        async (data) => {
          const templates = await data.json();

          dispatch(setTemplates(templates));
        }
      );
  }, [user]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Paperclip className="cursor-pointer text-foreground" />
        </PopoverTrigger>

        <PopoverContent className="w-fit h-fit">
          <div className="flex gap-3 flex-wrap items-center justify-center">
            <SendTemplate to={to} setOpen={setOpen} />
            <UploadImage to={to} setOpen={setOpen} />
            <UploadFile to={to} setOpen={setOpen} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
