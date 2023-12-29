import { addMetaAccount } from "@/store/meta-account";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
        description: "A conta foi criada.",
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
        <Icon className="bg-primary bottom-6 right-6 fixed">
          {busy ? (
            <Loader2 className="animate-spin text-primary-foreground" />
          ) : (
            <Plus className="text-primary-foreground" />
          )}
        </Icon>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-card rounded-md w-[350px]">
        <Form {...form}>
          <FormField
            control={form.control}
            name="numberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número da empresa</FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Phone className="text-foreground" />
                    <Input type="phone" {...field} />
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
                    <Building2 className="text-foreground" />
                    <Input {...field} />
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
                    <Cloud className="text-foreground" />
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction disabled={busy} onClick={() => onSubmitCreate()}>
            {busy ? <Loader2 className="animate-spin" /> : "Criar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
