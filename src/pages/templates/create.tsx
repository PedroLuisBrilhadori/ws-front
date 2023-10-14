import { Component } from "@/models/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectLanguage } from "./_components/select-language";
import { MessageTemplateView } from "./_components/message-template-view";

type CreateTemplate = {
  name: string;
  allow_category_change: boolean;
  category: string;
  language: string;
  components: {
    header?: Component;
    body?: Component;
    footer?: Component;
  };
};

export default function CreateTemplates() {
  const defaultValues: CreateTemplate = {
    name: "",
    allow_category_change: true,
    category: "MARKETING",
    language: "pt_BR",
    components: {
      header: {
        type: "HEADER",
        format: "TEXT",
        text: "",
      },
      body: {
        type: "BODY",
        text: "",
      },
      footer: {
        type: "FOOTER",
        text: "",
      },
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTemplate>({ defaultValues });

  const onSubmit: SubmitHandler<CreateTemplate> = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center gap-3 p-4 text-white">
      <h1 className="font-bold text-xl">Criação de Template</h1>

      <form
        className="flex flex-col items-center gap-3 w-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name")}
          type={"text"}
          className="bg-[#2a3942] rounded-sm w-full px-3 py-3 "
          placeholder="Nome"
        />

        <MessageTemplateView
          {...{
            inputs: {
              header: { name: "components.header.text", register },
              body: { name: "components.body.text", register },
              footer: { name: "components.footer.text", register },
            },
          }}
        />

        <select
          {...register("category")}
          className="bg-[#2a3942] rounded-sm w-full px-3 py-3 "
          placeholder="Categoria"
        >
          <option value="MARKETING">Marketing</option>
          <option value="UTILITY">Utilidades</option>
          <option value="AUTHENTICATION">Autenticação</option>
        </select>

        <SelectLanguage register={register} name="language" />

        <button>create</button>
      </form>
    </div>
  );
}
