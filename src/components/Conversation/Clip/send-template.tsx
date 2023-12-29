import { Icon } from "../../ui/icon";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from "../../ui/alert-dialog";
import { sendTemplateService } from "@/services";
import { Message } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/messages";
import { Template } from "@/models/template";
import { BookTemplate } from "lucide-react";
import { TemplateCards } from "@/pages/templates/_components/templates-cards";
import { useUserHeaders } from "@/hooks";
import { selectCurrentMetaAccount } from "@/store/current-meta-account";
import { ScrollArea } from "@/components/ui/scroll-area";

export type SendTemplateProps = {
  to?: string;
  setOpen: (open: boolean) => any;
};

export const SendTemplate = ({ to, setOpen }: SendTemplateProps) => {
  const dispatch = useDispatch();
  const { headers, user } = useUserHeaders();
  const metaBusinessAccount = useSelector(selectCurrentMetaAccount);

  const sendTemplate = ({ name, language }: Template) => {
    if (!user?.company?.id)
      throw new Error("Usuário não possui empresa cadastrada");

    sendTemplateService({
      name,
      language,
      to,
      headers,
      metaBusinessAccount,
      company: user?.company,
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
        <Icon>
          <BookTemplate
            className="text-popover-foreground"
            aria-label="Templates"
          />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent className="h-[90vh]">
        <ScrollArea>
          <TemplateCards onClick={(template) => sendTemplate(template)} />
        </ScrollArea>
        <AlertDialogCancel>Fechar</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
