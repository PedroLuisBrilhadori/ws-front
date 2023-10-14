import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export type InputRegister<Type extends FieldValues> = {
  register: UseFormRegister<Type>;
  name: Path<Type>;
};

export type MessageTemplateViewProps<Type extends FieldValues> = {
  inputs: {
    header: InputRegister<Type>;
    body: InputRegister<Type>;
    footer: InputRegister<Type>;
  };
};

export const MessageTemplateView = <Type extends FieldValues>({
  inputs,
}: MessageTemplateViewProps<Type>) => {
  return (
    <div className={`flex flex-col items-start mb-3`}>
      <div
        className={`flex gap-2 bg-[#202c33] p-2 text-white rounded-lg rounded-tl-none `}
      >
        <div className="flex flex-col gap-1 w-full break-words">
          <input
            {...inputs.header.register(inputs.header.name)}
            placeholder="Header..."
            className="bg-[#202c33] text-xl font-bold"
          />
          <textarea
            {...inputs.body.register(inputs.body.name)}
            placeholder="Body..."
            className="bg-[#202c33] h-16"
          />
          <input
            {...inputs.footer.register(inputs.footer.name)}
            placeholder="Footer..."
            className="bg-[#202c33] italic text-xs"
          />
        </div>

        <div className="self-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
          <div className="flex items-center gap-1 justify-between"></div>
        </div>
      </div>
    </div>
  );
};
