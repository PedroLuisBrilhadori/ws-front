import { Component } from "@/models/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectLanguage } from "./_components/select-language";

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTemplate>();

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
