import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Check,
  Cloud,
  Loader2,
  Pencil,
  Phone,
  Trash,
  X,
} from "lucide-react";
import { deleteMetaAccount, updateMetaAccount } from "@/services/meta-business";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MetaAccount, UpdateMetaAccount } from "@/models";
import { removeMetaAccount } from "@/store/meta-account";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCheckPermission, useUserHeaders } from "@/hooks";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";

export function MetaAccountForm({ metaAccount }: { metaAccount: MetaAccount }) {
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editting, setEditting] = useState(false);

  const updatePermission = useCheckPermission("UPDATE_COMPANY");
  const dispatch = useDispatch();

  const form = useForm<UpdateMetaAccount>({ defaultValues: metaAccount });
  const { reset } = form;

  const { headers } = useUserHeaders();
  const { toast } = useToast();

  const onSubmitUpdate = form.handleSubmit(async (data) => {
    setBusy(true);
    data = { ...data, numberId: Number(data.numberId) };
    try {
      await updateMetaAccount({ headers, metaAccount: data });
      metaAccount = data;

      toast({
        title: "Sucesso",
        description: "A conta foi atualizada.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
    reset(metaAccount);
    setBusy(false);
  });

  const onSubmitDelete = form.handleSubmit(async (data) => {
    setBusy(true);
    try {
      await deleteMetaAccount({ headers, id: data.id });

      dispatch(removeMetaAccount(data));

      toast({
        title: "Sucesso",
        description: "A conta foi excluida",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
    setBusy(false);
    setDeleting(false);
  });

  useEffect(() => {
    reset(metaAccount);
  }, [metaAccount, reset]);

  return (
    <Card className="w-full flex flex-col gap-3 pt-4 relative">
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
                <Trash
                  className={`${updatePermission ? "flex" : "hidden"} ${
                    editting ? "hidden" : "flex"
                  }  ${
                    deleting ? "" : "hover:cursor-pointer"
                  } text-destructive`}
                  onClick={() => {
                    if (!deleting) setDeleting(!deleting);
                  }}
                />
                <Check
                  onClick={() => {
                    onSubmitDelete();
                  }}
                  className={`${
                    deleting ? "flex" : "hidden"
                  } hover:cursor-pointer text-primary`}
                />
                <X
                  className={`${
                    deleting ? "flex" : "hidden"
                  } hover:cursor-pointer text-destructive`}
                  onClick={() => setDeleting(false)}
                />

                <Pencil
                  onClick={() => {
                    if (!editting) setEditting(!editting);
                  }}
                  className={` ${deleting ? "hidden" : "flex "} ${
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
            name="numberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-card-foreground">
                  Número da empresa
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Phone className="text-card-foreground" />
                    <Input type="phone" {...field} disabled={!editting} />
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
                <FormLabel className="text-card-foreground">
                  ID da conta WhatsApp Business
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Building2 className="text-card-foreground" />
                    <Input {...field} disabled={!editting} />
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
                <FormLabel className="text-card-foreground">
                  Token para cloud WhatsApp API
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Cloud className="text-card-foreground" />
                    <Input {...field} disabled={!editting} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
    </Card>
  );
}
