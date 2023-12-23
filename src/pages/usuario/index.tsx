import { useUserHeaders } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { User, ArrowLeft, Mail, Building2 } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UpdateUser } from "@/models/user";
import { Input } from "@/components/ui/input";

export default function Index() {
  const { user } = useUserHeaders();
  const [editting, setEditting] = useState(false);

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  const form = useForm<UpdateUser>({
    defaultValues: user,
  });

  const { reset } = form;

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  if (!user) return;

  return (
    <div className="bg-background-dark w-full h-screen flex flex-col items-center gap-y-4 text-gray-300">
      <div className="h-fit w-full gap-y-2 px-4 bg-component-pageHeader">
        <h2 className="min-h-[53px] w-full flex flex-row items-center gap-x-2 place-content-between">
          <div className="flex flex-row gap-x-4 items-center ">
            <ArrowLeft className="text-icon" onClick={handleGoBack} />{" "}
            <p className="font-semibold text-lg text-typography-embedded-dark">
              Perfil
            </p>
          </div>
          <Icon className="h-fit w-fit" onClick={() => setEditting(!editting)}>
            <Pencil
              className="text-icon"
              aria-label="Templates"
              style={{ height: 20 }}
            />
          </Icon>
        </h2>
      </div>
      <div className="flex justify-center w-full pl-6">
        <h1 className="text-typography-embedded-dark">
          Olá, <span className="font-semibold">{user.name.split(" ")[0]}</span>
        </h1>
      </div>
      {/* TODO: refator o card para receber o botão de edição dentro do seu
      corpo. */}
      <Form {...form}>
        <form className="bg-component-card shadow-md rounded-xl px-4 py-4 flex flex-col gap-3 justify-center min-w-[280px] max-w-[350px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-typography-embedded-dark">
                  Seu nome
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row items-center h-fit gap-x-4 ">
                    <User className="text-icon" />
                    <Input
                      className="disabled:cursor-default bg-component-textInputField-dark text-typography-input"
                      placeholder="Digite seu nome..."
                      {...field}
                      disabled={!editting}
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-typography-embedded-dark">
                  Seu e-mail
                </FormLabel>
                <FormControl>
                  <div className={`flex flex-row items-center h-fit gap-x-4`}>
                    <Mail className="text-icon" />
                    <Input
                      className="disabled:cursor-default bg-component-textInputField-dark text-typography-input"
                      placeholder="Digite seu e-mail..."
                      {...field}
                      disabled={!editting}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-typography-embedded-dark">
                  Sua empresa
                </FormLabel>
                <FormControl>
                  <div className={`flex flex-row items-center h-fit gap-x-4`}>
                    <Building2 className="text-icon" />
                    <Input
                      className="disabled:cursor-default bg-component-textInputField-dark text-typography-input"
                      {...field}
                      disabled={true}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
