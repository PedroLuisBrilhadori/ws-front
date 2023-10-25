import { BookTemplate, Paperclip } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Icon } from "../ui/icon";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../ui/alert-dialog";
import { TemplateCards } from "@/pages/templates/_components/templates-cards";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setTemplates } from "@/store/templates";
import { Template } from "@/models/template";
import { useParams } from "react-router-dom";
import { addMessage } from "@/store/messages";

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

  const sendTemplate = ({ name, language }: Template) => {
    const dto = {
      to,
      template: {
        name,
        language: {
          code: language,
        },
      },
    };

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    fetch("http://localhost:3000/messages/template", {
      method: "POST",
      headers,
      body: JSON.stringify(dto),
    }).then(async (data) => {
      const message = await data.json();

      dispatch(addMessage(message));
      setOpen(false);
    });
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Paperclip className="cursor-pointer" />
        </PopoverTrigger>

        <PopoverContent>
          <AlertDialog>
            <AlertDialogTrigger>
              <Icon className="bg-green-500">
                <BookTemplate aria-label="Templates" />
              </Icon>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <div className="h-[400px] overflow-y-scroll">
                <TemplateCards onClick={(template) => sendTemplate(template)} />
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>
    </div>
  );
};
