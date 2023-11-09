import { Icon } from "../../ui/icon";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../../ui/alert-dialog";
import { Check, File, ImagePlus, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/messages";

export type UploadFileProps = {
  to?: string;
  setOpen: (open: boolean) => any;
};

export const UploadFile = ({ setOpen, to }: UploadFileProps) => {
  const [input, onInput] = useState<HTMLInputElement>();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icon className="bg-green-500">
          <File aria-label="Upload de documentos" />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <div className="flex flex-col gap-3 items-center justify-center">
          <UploaderContent
            to={to}
            input={input}
            onInput={onInput}
            setOpen={setOpen}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type UploaderContentProps = {
  onInput?: (e: HTMLInputElement) => void;
  input?: HTMLInputElement;
  setOpen: (open: boolean) => any;
  to?: string;
};

const UploaderContent = ({
  input,
  onInput,
  setOpen,
  to,
}: UploaderContentProps) => {
  if (input) return <ImagePreview to={to} setOpen={setOpen} input={input} />;

  return (
    <InputDocument
      onInput={(e) => onInput && onInput(e.target as HTMLInputElement)}
    />
  );
};

type ImagePreviewProps = {
  input: HTMLInputElement;
  setOpen: (open: boolean) => any;
  to?: string;
};

const ImagePreview = ({ input, setOpen, to }: ImagePreviewProps) => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");

  if (!input.files) return null;

  const file = input.files[0];
  const src = URL.createObjectURL(file);

  const sendImage = async () => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("caption", caption);

    const url = "http://localhost:3000/messages/image";

    const response = await fetch(`${url}/${to}`, {
      method: "POST",
      body: data,
    });

    const json = await response.json();

    if (json?.message) {
      setOpen(false);
      dispatch(addMessage(json?.message));
    }
  };

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <h1>Documento selecionado: </h1>

      <a target="_blank" href={src}>
        {file.name} ({file.size / 1000} KB)
      </a>

      <div className="flex gap-3">
        <Icon
          className="border-2 text-red-500 border-red-500"
          onClick={() => setOpen(false)}
        >
          <X />
        </Icon>
        <Icon
          className="bg-green-500"
          onClick={() => {
            sendImage();
          }}
        >
          <Check />
        </Icon>
      </div>
    </div>
  );
};

type InputDocumentProps = {
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
};

const InputDocument = ({ onInput }: InputDocumentProps) => {
  return (
    <>
      <Input
        id="inputDocument"
        placeholder="Escolher um documento"
        className="bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white hidden"
        type="file"
        accept="*/*"
        onInput={onInput}
      />
      <Label htmlFor="inputDocument">
        <div className="flex gap-3 items-center cursor-pointer">
          Escolher um documento
          <Upload />
        </div>
      </Label>
    </>
  );
};
