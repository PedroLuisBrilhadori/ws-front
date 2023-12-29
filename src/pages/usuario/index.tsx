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
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="flex-col gap-y-4 h-screen flex items-center w-full">
      <div className="h-[53px] w-full">
        <div className="fixed gap-y-2 h-fit px-4 top-0 w-full z-20">
          <h2 className="flex flex-row gap-x-2 min-h-[53px] items-center place-content-between w-full">
            <div className="flex flex-row gap-x-4 items-center">
              <ArrowLeft
                className="text-foreground hover:cursor-pointer"
                onClick={handleGoBack}
              />
              <p className="font-semibold text-foreground text-lg">Perfil</p>
            </div>
          </h2>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <h1 className="text-foreground">
          Olá, <span className="font-semibold">{user.name.split(" ")[0]}</span>
        </h1>
      </div>

      <Card className="pt-4 relative max-w-[350px]">
        <CardContent>
          <Form {...form}>
            <div
              className={`absolute flex flex-row gap-4 top-[10px] ${
                busy ? "right-[15px]" : "right-[24px]"
              }`}
            >
              {busy ? (
                <Loader2 className="animate-spin text-card-foreground" />
              ) : (
                <>
                  <Pencil
                    onClick={() => {
                      if (!editting) setEditting(!editting);
                    }}
                    className={` ${
                      editting ? "" : "hover:cursor-pointer"
                    } text-card-foreground`}
                  />
                  <Check
                    onClick={() => {
                      onSubmitUpdate();
                      setEditting(false);
                    }}
                    className={`${
                      editting ? "flex" : "hidden"
                    } hover:cursor-pointer text-primary`}
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
                  <FormLabel className="text-card-foreground">
                    Seu nome
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <User className="text-card-foreground" />
                      <Input {...field} disabled={!editting} />
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
                  <FormLabel className="text-card-foreground">
                    Seu e-mail
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <Mail className="text-card-foreground" />
                      <Input type="email" {...field} disabled={!editting} />
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
                  <FormLabel className="text-card-foreground">
                    Sua empresa
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-x-4 h-fit items-center">
                      <Building2 className="text-card-foreground" />
                      <Input {...field} disabled={true} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
