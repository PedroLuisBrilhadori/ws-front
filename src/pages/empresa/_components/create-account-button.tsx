import { addMetaAccount } from "@/store/meta-account";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Building2, Check, Cloud, Loader2, Phone, Plus, X } from "lucide-react";
import { createMetaAccountService } from "@/services";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { MetaAccount } from "@/models";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUserHeaders } from "@/hooks";

export function CreateMetaAccountButton() {
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { headers, user } = useUserHeaders();

  const dispatch = useDispatch();

  const form = useForm<MetaAccount>();

  const handleCreate = (metaAccount: MetaAccount) => {
    dispatch(addMetaAccount(metaAccount));
  };

  if (!user) return;

  const onSubmitCreate = form.handleSubmit(async (data) => {
    data = { ...data, numberId: Number(data.numberId) };
    try {
      setBusy(true);

      if (!user?.company?.id) throw new Error("Empresa não encontrada");

      data.id = await createMetaAccountService({
        headers,
        metaAccount: data,
        company: user.company,
      }).then((res) => res.id);

      handleCreate(data);

      toast({
        title: "Sucesso",
        description: "Conta atualizada com sucesso.",
        variant: "success",
      });

      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
    setBusy(false);
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Icon className="bg-green-600 bottom-4 right-4 fixed">
          <Plus aria-label="Templates" />
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <div className="bg-black h-fit p-4 rounded-xl w-full max-w-[350px]">
          <Form {...form}>
            <form className="flex flex-col gap-3 justify-center relative min-w-[200px]">
              <div
                className={`absolute flex flex-row gap-4 top-[-5px] ${
                  busy ? "right-[15px]" : "right-0"
                }`}
              >
                {busy ? (
                  <Loader2 className="animate-spin text-blue-700" />
                ) : (
                  <>
                    <Check
                      onClick={() => {
                        onSubmitCreate();
                      }}
                      className={` hover:cursor-pointer text-green-600`}
                    />
                    <X
                      className={`hover:cursor-pointer text-red-600`}
                      onClick={() => setOpen(false)}
                    />
                  </>
                )}
              </div>

              <FormField
                control={form.control}
                name="numberId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número da empresa</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-x-4 h-fit items-center">
                        <Phone />
                        <Input
                          type="number"
                          className={"disabled:cursor-default"}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID da conta WhatsApp Business</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-x-4 h-fit items-center">
                        <Building2 />
                        <Input className="disabled:cursor-default" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token para cloud WhatsApp API</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-x-4 h-fit items-center">
                        <Cloud />
                        <Input className="disabled:cursor-default" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
