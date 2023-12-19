import { Building2, Check, X, Cloud, Pencil, Phone, Trash } from "lucide-react";
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
import { useState } from "react";

export function RestrictedForm({
  metaAccount,
  key,
  updatePermission,
}: {
  metaAccount: MetaAccount;
  key: number;
  updatePermission: any;
}) {
  const [deleting, setDeleting] = useState(false);
  const [editting, setEditting] = useState(false);

  const form = useForm<UpdateMetaAccount>({ defaultValues: metaAccount });

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const onSubmitUpdate = async (data: UpdateMetaAccount) => {
    try {
      await updateMetaAccount({
        headers: headers,
        id: data.id,
        metaAccount: data,
      });
    } catch (error) {}
  };

  const onSubmitDelete = async (data: DeleteMetaAccount) => {
    try {
      await deleteMetaAccount({
        id: data.id,
        headers: headers,
      });
    } catch (error) {}
  };

  return (
    <div
      key={key}
      className="bg-black/50 flex flex-col h-fit p-4 rounded-xl w-[calc(100vw-20px)] max-w-[350px] z-0"
    >
      <Form {...form}>
        <form className="flex flex-col gap-3 justify-center relative min-w-[300px]">
          <div className="absolute flex flex-row gap-4 right-0 top-[-5px]">
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
                form.handleSubmit(onSubmitDelete), window.location.reload();
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
                form.handleSubmit(onSubmitUpdate), setEditting(false);
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
