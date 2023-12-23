import { Badge, Building2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUser } from "@/models";
import { useEffect } from "react";
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
    <div className="bg-black h-fit p-4 rounded-xl w-full self-center min-w-[280px] max-w-[350px]">
      <Form {...form}>
        <form className="flex flex-col gap-3 justify-center">
          <FormField
            control={form.control}
            name="company.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua empresa</FormLabel>
                <FormControl>
                  <div className="flex flex-row h-fit gap-x-4 items-center">
                    <Building2 />
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
                  <div className="flex flex-row h-fit gap-x-4 items-center">
                    <Badge />
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
