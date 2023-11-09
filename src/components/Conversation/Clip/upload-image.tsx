import { Icon } from "../../ui/icon";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../../ui/alert-dialog";
import { Check, ImagePlus, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/messages";

export type UploadImageProps = {
  to?: string;
  setOpen: (open: boolean) => any;
};

export const UploadImage = ({ setOpen, to }: UploadImageProps) => {
  const [input, onInput] = useState<HTMLInputElement>();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icon className="bg-green-500">
          <ImagePlus aria-label="Upload de imagens" />
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
    <InputImage
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
      <a target="_blank" href={src}>
        <img
          src={src}
          className="w-[300px] h-[300px] object-cover rounded-sm"
        />
      </a>

      <input
        className="w-full bg-transparent border-2 border-[#8696a0] rounded-lg px-3 py-3 "
        placeholder="legenda para a imagem"
        onChange={(e) => setCaption(e.target.value)}
      />

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

type InputImageProps = {
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
};

const InputImage = ({ onInput }: InputImageProps) => {
  return (
    <>
      <Input
        id="inputImage"
        placeholder="Escolher imagem"
        className="bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white hidden"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onInput={onInput}
      />
      <Label htmlFor="inputImage">
        <div className="flex gap-3 items-center cursor-pointer">
          Escolher uma imagem
          <Upload />
        </div>
      </Label>
    </>
  );
};
