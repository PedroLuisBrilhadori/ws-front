import { Component } from "@/models/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectLanguage } from "./_components/select-language";
import { MessageTemplateView } from "./_components/message-template-view";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

type CreateTemplate = {
  name: string;
  allow_category_change: boolean;
  category: string;
  language: string;
  components: Component[];
};

export const transformTemplate = (template: CreateTemplate) => {
  template.name = template.name.toLowerCase();

  if (!template.components[2].text) template.components.pop();

  if (!template.components[0].text) template.components.reverse().pop();

  return template;
};

export default function CreateTemplates() {
  const defaultValues: CreateTemplate = {
    name: "",
    allow_category_change: true,
    category: "MARKETING",
    language: "pt_BR",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "",
      },
      {
        type: "BODY",
        text: "",
      },
      {
        type: "FOOTER",
        text: "",
      },
    ],
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTemplate>({ defaultValues });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateTemplate> = (data) => {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    const body = JSON.stringify(transformTemplate(data));

    fetch("http://localhost:3000/templates", {
      method: "POST",
      headers,
      body,
    }).then(async (response) => {
      const data = await response.json();

      if (data?.error) throw new Error(data.error);

      navigate("/templates");
    });
  };

  return (
    <div className="flex flex-col items-center  text-white">
      <div className="flex justify-between items-center bg-[#202c33] w-full h-14 px-4">
        <ArrowLeft
          className="cursor-pointer text-white"
          onClick={() => {
            navigate(`/templates`);
          }}
        />
      </div>

      <div className="flex flex-col w-full items-center  gap-3 p-4">
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
                header: { name: "components.0.text", register },
                body: { name: "components.1.text", register },
                footer: { name: "components.2.text", register },
              },
            }}
          />

          <select
            {...register("category")}
            className="bg-[#2a3942] rounded-sm w-full px-3 py-3 "
            placeholder="Categoria"
          >
            <option value="MARKETING">Marketing</option>
          </select>

          <SelectLanguage register={register} name="language" />

          <button className="bg-green-600 rounded-lg px-2 py-1">
            Criar Template
          </button>
        </form>
      </div>
    </div>
  );
}
