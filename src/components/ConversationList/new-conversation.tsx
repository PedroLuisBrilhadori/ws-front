import { Check, MessageSquarePlus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewConversation = () => {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Icon className="bg-green-500">
          <MessageSquarePlus aria-label="Templates" />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <div className="flex flex-col gap-3">
          <h1>Nova conversa</h1>

          <Input
            className=""
            placeholder="Numero..."
            onChange={(e) => setNumber(e.target.value)}
          ></Input>

          <div className="flex gap-3 self-end">
            <Icon
              className="border-2 border-red-500"
              onClick={() => setOpen(false)}
            >
              <X className=" text-red-500" />
            </Icon>
            <Icon
              className="bg-green-500"
              onClick={() => {
                number !== "" && navigate(`conversation/${number}`);
              }}
            >
              <Check />
            </Icon>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
