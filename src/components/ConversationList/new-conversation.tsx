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
        <Icon className="bg-component-button">
          <MessageSquarePlus aria-label="Templates" className="text-icon" />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form
          className="flex flex-col gap-3 bg-component-card p-4 rounded-xl"
          onSubmit={onSubmit}
        >
          <h1 className="text-typography-embedded-dark">Nova conversa</h1>
          <Input
            ref={numberRef}
            className="bg-component-textInputField-dark text-typography-input"
            placeholder="Número..."
            maxLength={20}
            onChange={(e) => {
              if (!e.target.value) return;

              const num = telephoneMask(e.target.value);

              e.target.value = num;
            }}
          />

          <div className="flex gap-3 self-end">
            <Icon
              onClick={() => {
                setOpen(false);
              }}
              className="border-2 border-destructive"
            >
              <X className=" text-destructive" />
            </Icon>

            <button>
              <Icon className="border-2 border-success">
                <Check className="text-success" />
              </Icon>
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
