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
        description: "Conta excluida com sucesso.",
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
    setDeleting(false);
  });

  useEffect(() => {
    reset(metaAccount);
  }, [metaAccount, reset]);

  return (
    <div className="bg-component-card h-fit p-4 rounded-xl w-full min-w-[280px] max-w-[350px]">
      <Form {...form}>
        <form className="flex flex-col gap-3 justify-center relative ">
          <div
            className={`absolute flex flex-row gap-4 top-[-5px] ${
              busy ? "right-[15px]" : "right-0"
            }`}
          >
            {busy ? (
              <Loader2 className="animate-spin text-info" />
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
                  } hover:cursor-pointer text-success`}
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
            name="numberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-typography-embedded-dark">
                  Número da empresa
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Phone className="text-icon" />
                    <Input
                      type="number"
                      className="text-typography-input bg-component-textInputField-dark disabled:cursor-default"
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
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-typography-embedded-dark">
                  ID da conta WhatsApp Business
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Building2 className="text-icon" />
                    <Input
                      className="text-typography-input bg-component-textInputField-dark disabled:cursor-default"
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
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-typography-embedded-dark">
                  Token para cloud WhatsApp API
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Cloud className="text-icon" />
                    <Input
                      className="text-typography-input bg-component-textInputField-dark disabled:cursor-default"
                      {...field}
                      disabled={!editting}
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
