import { Check, MessageSquarePlus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  removeTelephoneMask,
  telephoneMask,
  validNumber,
} from "@/lib/telephone";

export const NewConversation = () => {
  const [open, setOpen] = useState(false);
  const numberRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.type !== "submit") return;

    const number = numberRef.current?.value;

    if (!number) return;

    if (!validNumber(number)) return;

    const num = removeTelephoneMask(number);

    navigate(`conversation/${num}`);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Icon className="bg-green-500">
          <MessageSquarePlus aria-label="Templates" />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <h1>Nova conversa</h1>
          <Input
            ref={numberRef}
            className=""
            placeholder="Numero..."
            maxLength={20}
            onChange={(e) => {
              if (!e.target.value) return;

              const num = telephoneMask(e.target.value);

              e.target.value = num;
            }}
          ></Input>

          <div className="flex gap-3 self-end">
            <Icon
              onClick={() => {
                setOpen(false);
              }}
              className="border-2 border-red-500"
            >
              <X className=" text-red-500" />
            </Icon>

            <button>
              <Icon className="bg-green-500">
                <Check />
              </Icon>
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
