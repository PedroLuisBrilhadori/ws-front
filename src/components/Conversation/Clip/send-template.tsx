import { Icon } from "../../ui/icon";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../../ui/alert-dialog";
import { sendTemplateService } from "@/services";
import { Message } from "@/models";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/messages";
import { Template } from "@/models/template";
import { BookTemplate } from "lucide-react";
import { TemplateCards } from "@/pages/templates/_components/templates-cards";
import { useUserHeaders } from "@/hooks";

export type SendTemplateProps = {
  to?: string;
  setOpen: (open: boolean) => any;
};

export const SendTemplate = ({ to, setOpen }: SendTemplateProps) => {
  const dispatch = useDispatch();
  const { headers } = useUserHeaders();

  const sendTemplate = ({ name, language }: Template) => {
    sendTemplateService({
      name,
      language,
      to,
      headers,
      callback: (message?: Message) => {
        if (!message) return;

        dispatch(addMessage(message));
        setOpen(false);
      },
    });
  };

  return (
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
  );
};
