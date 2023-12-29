import { Icon } from "../../ui/icon";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from "../../ui/alert-dialog";
import { Check, File, ImagePlus, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/messages";
import { baseUrl } from "@/services";
import { useUserHeaders } from "@/hooks";
import { Button } from "@/components/ui";

export type UploadFileProps = {
  to?: string;
  setOpen: (open: boolean) => any;
};

export const UploadFile = ({ setOpen, to }: UploadFileProps) => {
  const [input, onInput] = useState<HTMLInputElement>();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icon>
          <File
            className="text-popover-foreground"
            aria-label="Upload de documentos"
          />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[350px] rounded-md">
        <div className="flex flex-col gap-3 items-center justify-center">
          <UploaderContent
            to={to}
            input={input}
            onInput={onInput}
            setOpen={setOpen}
          />
        </div>
        <AlertDialogCancel>Fechar</AlertDialogCancel>
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
  const { headers } = useUserHeaders(false);

  if (!input.files) return null;

  const file = input.files[0];
  const src = URL.createObjectURL(file);

  const sendDocument = async () => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("caption", caption);

    const url = `${baseUrl}/messages/image`;

    const response = await fetch(`${url}/${to}`, {
      headers,
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
    <div className="flex flex-col gap-3 items-center justify-center w-full">
      <div className="flex flex-col gap-1 border-2 border-[#8696a0] rounded-lg px-3 py-3">
        <h1>Documento selecionado: </h1>

        <a target="_blank" href={src}>
          {file.name} ({file.size / 1000} KB)
        </a>
      </div>

      <Input
        placeholder="Legenda para o documento"
        onChange={(e) => setCaption(e.target.value)}
      />

      <Button
        className="w-full"
        onClick={() => {
          sendDocument();
        }}
      >
        Enviar
      </Button>
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
