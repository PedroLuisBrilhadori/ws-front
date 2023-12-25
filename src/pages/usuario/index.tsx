import {
  ArrowLeft,
  Building2,
  Check,
  Loader2,
  Mail,
  Pencil,
  User,
  X,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUser } from "@/models/user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useUserHeaders } from "@/hooks";

export default function Index() {
  const [editting, setEditting] = useState(false);
  const [busy, setBusy] = useState(false);
  const { user } = useUserHeaders();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<UpdateUser>({
    defaultValues: user,
  });

  const handleGoBack = () => navigate(-1);
  const { reset } = form;

  const onSubmitUpdate = form.handleSubmit(async (data) => {
    console.log(data);
    setBusy(true);
    try {
      toast({
        title: "Sucesso",
        description: "Conta atualizada com sucesso.",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
    setBusy(false);
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  if (!user) return;

  return (
    <div className="bg-background-dark flex-col gap-y-4  h-screen flex items-center text-gray-300 w-full">
      <div className="h-[53px] text-typography-embedded-dark w-full">
        <div className="bg-component-pageHeader fixed gap-y-2 h-fit px-4 top-0 w-full z-20">
          <h2 className="flex flex-row gap-x-2 min-h-[53px] items-center place-content-between text-typography-embedded-dark w-full">
            <div className="flex flex-row gap-x-4 items-center">
              <ArrowLeft className="text-icon" onClick={handleGoBack} />
              <p className="font-semibold text-typography-embedded-dark text-lg">
                Perfil
              </p>
            </div>
          </h2>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <h1 className="text-typography-embedded-dark">
          Olá, <span className="font-semibold">{user.name.split(" ")[0]}</span>
        </h1>
      </div>

      <div className="bg-component-card h-fit p-4 rounded-md w-full min-w-[280px] max-w-[350px]">
        <Form {...form}>
          <form className="flex flex-col gap-3 justify-center relative">
            <div
              className={`absolute flex flex-row gap-4 top-[-5px] ${
                busy ? "right-[15px]" : "right-0"
              }`}
            >
              {busy ? (
                <Loader2 className="animate-spin text-info" />
              ) : (
                <>
                  <Pencil
                    onClick={() => {
                      if (!editting) setEditting(!editting);
                    }}
                    className={`${
                      editting ? "" : "hover:cursor-pointer"
                    } text-icon`}
                  />
                  <Check
                    onClick={() => {
                      onSubmitUpdate();
                      setEditting(false);
                    }}
                    className={`${
                      editting ? "flex" : "hidden"
                    } hover:cursor-pointer text-success`}
                  />
                  <X
                    className={`${
                      editting ? "flex" : "hidden"
                    } hover:cursor-pointer text-destructive`}
                    onClick={() => {
                      setEditting(false);
                      form.reset();
                    }}
                  />
                </>
              )}
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-typography-embedded-dark">
                    Seu nome
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <User className="text-icon" />
                      <Input type="phone" {...field} disabled={!editting} />
                    </div>
                  </FormControl>
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
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <Mail className="text-icon" />
                      <Input {...field} disabled={!editting} />
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
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <Building2 className="text-icon" />
                      <Input {...field} disabled={true} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
