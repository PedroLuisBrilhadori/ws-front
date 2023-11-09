import { Paperclip } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setTemplates } from "@/store/templates";
import { useParams } from "react-router-dom";
import { SendTemplate } from "./send-template";
import { UploadImage } from "./upload-image";
import { UploadFile } from "./upload-file";

export const Clip = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { to } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/templates?status=APPROVED").then(
      async (data) => {
        const templates = await data.json();

        dispatch(setTemplates(templates));
      }
    );
  }, []);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Paperclip className="cursor-pointer" />
        </PopoverTrigger>

        <PopoverContent>
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
