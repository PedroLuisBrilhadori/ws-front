import {
  Building2,
  Check,
  X,
  Cloud,
  Loader2,
  Pencil,
  Phone,
  Trash,
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
import { MetaAccount, DeleteMetaAccount, UpdateMetaAccount } from "@/models";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUserHeaders } from "@/hooks";
import { useToast } from "@/components/ui/use-toast";

export function MetaAccountForm({
  handleDelete,
  metaAccount,
  updatePermission,
}: {
  handleDelete: (id: string) => void;
  metaAccount: MetaAccount;
  updatePermission: any;
}) {
  const [busy, setBusy] = useState(false);
  // const busy = true;
  const [deleting, setDeleting] = useState(false);
  const [editting, setEditting] = useState(false);

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
      handleDelete(data.id);
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
  });

  useEffect(() => {
    reset(metaAccount);
  }, [metaAccount, reset]);

  return (
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
                <Trash
                  className={`${updatePermission ? "flex" : "hidden"} ${
                    editting ? "hidden" : "flex"
                  }  ${deleting ? "" : "hover:cursor-pointer"} text-red-600`}
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
                  } hover:cursor-pointer text-green-600`}
                />
                <X
                  className={`${
                    deleting ? "flex" : "hidden"
                  } hover:cursor-pointer text-red-600`}
                  onClick={() => setDeleting(false)}
                />

                <Pencil
                  onClick={() => {
                    if (!editting) setEditting(!editting);
                  }}
                  className={` ${deleting ? "hidden" : "flex "} ${
                    editting ? "" : "hover:cursor-pointer"
                  } text-[#AEBAC1]`}
                />
                <Check
                  onClick={() => {
                    onSubmitUpdate();
                    setEditting(false);
                  }}
                  className={`${
                    editting ? "flex" : "hidden"
                  } hover:cursor-pointer text-green-600`}
                />
                <X
                  className={`${
                    editting ? "flex" : "hidden"
                  } hover:cursor-pointer text-red-600`}
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
                <FormLabel>Número da empresa</FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Phone />
                    <Input
                      type="number"
                      className={"disabled:cursor-default"}
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
                <FormLabel>ID da conta WhatsApp Business</FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Building2 />
                    <Input
                      className="disabled:cursor-default"
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
                <FormLabel>Token para cloud WhatsApp API</FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-x-4 h-fit items-center">
                    <Cloud />
                    <Input
                      className="disabled:cursor-default"
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
