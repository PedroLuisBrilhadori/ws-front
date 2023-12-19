import { ArrowLeft, Building2, Mail, Pencil, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUser } from "@/models/user";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserHeaders } from "@/hooks";

export function BaseForm() {
  const { user } = useUserHeaders();
  const form = useForm<UpdateUser>({ defaultValues: user });
  const { reset } = form;

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  return (
    <div className="flex flex-col h-fit w-[calc(100vw-20px)] max-w-[350px] p-4 bg-black/50 rounded-xl">
      <Form {...form}>
        <form className="flex flex-col gap-3 justify-center">
          <FormField
            control={form.control}
            name="company.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua empresa</FormLabel>
                <FormControl>
                  <div className="flex flex-row items-center h-fit gap-x-4 ">
                    <User />
                    <Input
                      className={"disabled:cursor-default"}
                      {...field}
                      disabled={true}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company.cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <div className={`flex flex-row items-center h-fit gap-x-4`}>
                    <Mail />
                    <Input
                      className="disabled:cursor-default"
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
