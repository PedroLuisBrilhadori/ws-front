import { Badge, Building2 } from "lucide-react";
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
    <Card className="min-w-[280px] max-w-[350px]">
      <CardContent>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="company.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground">
                    Sua empresa
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-row h-fit gap-x-4 items-center">
                      <Building2 className="text-card-foreground" />
                      <Input {...field} disabled={true} />
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
                  <FormLabel className="text-card-foreground">CNPJ</FormLabel>
                  <FormControl>
                    <div className="flex flex-row h-fit gap-x-4 items-center">
                      <Badge className="text-card-foreground" />
                      <Input {...field} disabled={true} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
